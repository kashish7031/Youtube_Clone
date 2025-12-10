import { Router } from "express";
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/videoController.js";
import { verifyJWT, verifyJWTOptional } from "../middleware/authMiddleware.js"; // Import Optional
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// 1. Get All Videos (Public) & Publish (Protected)
router.route("/")
    .get(verifyJWTOptional, getAllVideos) // Added Optional here too for search filters
    .post(
        verifyJWT,
        upload.fields([
            { name: "videoFile", maxCount: 1 },
            { name: "thumbnail", maxCount: 1 },
        ]),
        publishAVideo
    );

// 2. Video ID Routes
router.route("/:videoId")
    .get(verifyJWTOptional, getVideoById) // <--- CRITICAL FIX: Use Optional Auth here
    .delete(verifyJWT, deleteVideo)
    .patch(verifyJWT, upload.single("thumbnail"), updateVideo);

// 3. Toggle Status
router.route("/toggle/publish/:videoId").patch(verifyJWT, togglePublishStatus);

export default router;