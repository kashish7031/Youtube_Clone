import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/Video.js";
import { User } from "../models/User.js";
import { Like } from "../models/Like.js";
import { Subscription } from "../models/Subscription.js"; 
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// 1. Publish Video
const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description, category, videoUrl, thumbnailUrl } = req.body;

    if ([title, description].some((field) => field?.trim() === "")) throw new ApiError(400, "Required fields missing");

    let finalVideoUrl = videoUrl;
    let finalThumbnailUrl = thumbnailUrl;
    let duration = 0;

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (videoLocalPath) {
        const videoUpload = await uploadOnCloudinary(videoLocalPath);
        if (!videoUpload) throw new ApiError(500, "Video upload failed");
        finalVideoUrl = videoUpload.url;
        duration = videoUpload.duration;
    } 
    
    if (thumbnailLocalPath) {
        const thumbnailUpload = await uploadOnCloudinary(thumbnailLocalPath);
        if (!thumbnailUpload) throw new ApiError(500, "Thumbnail upload failed");
        finalThumbnailUrl = thumbnailUpload.url;
    }

    if (!finalVideoUrl || !finalThumbnailUrl) throw new ApiError(400, "Files/URLs required");

    const video = await Video.create({
        title,
        description,
        videoFile: finalVideoUrl,
        thumbnail: finalThumbnailUrl,
        duration: duration || 0,
        category: category || "All",
        owner: req.user._id,
        isPublished: true
    });

    return res.status(201).json(new ApiResponse(201, video, "Video published successfully"));
});

// 2. Get All Videos
const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, userId, type, category } = req.query;
    let filter = { isPublished: true };

    if (query) filter.$or = [{ title: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }];
    if (category && category !== "All") filter.category = category;

    const videos = await Video.find(filter).populate("owner", "username avatar").sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, videos, "Fetched successfully"));
});

// 3. Get Video By ID (Corrects View Count & Like Status)
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid Video ID");

    // Increment Views
    await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

    const userId = req.user ? new mongoose.Types.ObjectId(req.user._id) : null;

    const videoAggregate = await Video.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(videoId) } },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [{ $project: { username: 1, fullName: 1, avatar: 1, subscribersCount: 1 } }]
            }
        },
        { $addFields: { owner: { $first: "$owner" } } },
        
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likes"
            }
        },
        {
            $addFields: {
                likesCount: { $size: "$likes" },
                isLiked: {
                    $cond: {
                        if: { $in: [userId, "$likes.likedBy"] },
                        then: true,
                        else: false
                    }
                }
            }
        },

        {
            $lookup: {
                from: "subscriptions",
                let: { ownerId: "$owner._id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$channel", "$$ownerId"] },
                                    { $eq: ["$subscriber", userId] }
                                ]
                            }
                        }
                    }
                ],
                as: "isSubscribed"
            }
        },
        {
            $addFields: {
                isSubscribed: { $cond: { if: { $gt: [{ $size: "$isSubscribed" }, 0] }, then: true, else: false } }
            }
        },
        { $project: { likes: 0 } }
    ]);

    if (!videoAggregate?.length) throw new ApiError(404, "Video not found");

    return res.status(200).json(new ApiResponse(200, videoAggregate[0], "Video fetched successfully"));
});

// 4. Update Video
const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid ID");

    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(404, "Not found");
    if (video.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Unauthorized");

    const updatedVideo = await Video.findByIdAndUpdate(videoId, { $set: { title, description } }, { new: true });
    return res.status(200).json(new ApiResponse(200, updatedVideo, "Updated"));
});

// 5. Delete Video
const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid ID");

    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(404, "Not found");
    if (video.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Unauthorized");

    await Video.findByIdAndDelete(videoId);
    await Like.deleteMany({ video: videoId });
    return res.status(200).json(new ApiResponse(200, {}, "Deleted"));
});

// Toggle Publish (Required)
const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(404, "Not found");
    
    video.isPublished = !video.isPublished;
    await video.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(200, video, "Status toggled"));
});

export { publishAVideo, getAllVideos, getVideoById, updateVideo, deleteVideo, togglePublishStatus };