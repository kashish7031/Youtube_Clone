import { Router } from "express";
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/commentController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = Router();

// 1. Get Comments (Public) & Add Comment (Protected)
// Matches: /api/v1/comments/:videoId
router.route("/:videoId")
    .get(getVideoComments) // Anyone can read comments
    .post(verifyJWT, addComment); // Only logged-in users can post

// 2. Delete & Update Comment (Protected)
// Matches: /api/v1/comments/c/:commentId
router.route("/c/:commentId")
    .delete(verifyJWT, deleteComment)
    .patch(verifyJWT, updateComment);

export default router;