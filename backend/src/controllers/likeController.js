import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/Like.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// 1. Toggle Video Like
const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid Video ID");

    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    });

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);
        return res.status(200).json(new ApiResponse(200, { isLiked: false }, "Unliked"));
    } else {
        await Like.create({ video: videoId, likedBy: req.user._id });
        return res.status(200).json(new ApiResponse(200, { isLiked: true }, "Liked"));
    }
});

// 2. Toggle Dislike (Strictly Removes Like)
const toggleVideoDislike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid Video ID");

    // Check if user currently likes the video
    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    });

    // If they like it, remove the like
    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);
        return res.status(200).json(new ApiResponse(200, { isLiked: false }, "Disliked (Like removed)"));
    }

    // If they haven't liked it, do nothing (or in future, add to Dislike model)
    return res.status(200).json(new ApiResponse(200, { isLiked: false }, "Disliked"));
});

// 3. Get Liked Videos
const getLikedVideos = asyncHandler(async (req, res) => {
    const likedVideos = await Like.aggregate([
        { $match: { likedBy: new mongoose.Types.ObjectId(req.user._id), video: { $exists: true } } },
        { $lookup: { from: "videos", localField: "video", foreignField: "_id", as: "video", pipeline: [{ $lookup: { from: "users", localField: "owner", foreignField: "_id", as: "owner", pipeline: [{ $project: { username: 1, fullName: 1, avatar: 1 } }] } }, { $addFields: { owner: { $first: "$owner" } } }] } },
        { $unwind: "$video" },
        { $project: { _id: 0, video: 1 } }
    ]);
    return res.status(200).json(new ApiResponse(200, likedVideos.map(i => i.video), "Fetched"));
});

// Placeholders
const toggleCommentLike = asyncHandler(async(req, res) => res.status(200).json({}));
const toggleTweetLike = asyncHandler(async(req, res) => res.status(200).json({}));

export { toggleVideoLike, toggleVideoDislike, getLikedVideos, toggleCommentLike, toggleTweetLike };