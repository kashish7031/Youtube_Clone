import { Router } from 'express';
import { 
    getLikedVideos, 
    toggleCommentLike, 
    toggleVideoLike, 
    toggleVideoDislike, // Import the new Dislike controller
    toggleTweetLike 
} from "../controllers/likeController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = Router();

// Apply verifyJWT middleware to all routes in this file
// This ensures only logged-in users can like/dislike
router.use(verifyJWT);

// 1. Toggle Video Like: POST /api/v1/likes/toggle/v/:videoId
router.route("/toggle/v/:videoId").post(toggleVideoLike);

// 2. Toggle Video Dislike: POST /api/v1/likes/toggle/d/:videoId  <-- NEW ROUTE
router.route("/toggle/d/:videoId").post(toggleVideoDislike);

// 3. Toggle Comment Like: POST /api/v1/likes/toggle/c/:commentId
router.route("/toggle/c/:commentId").post(toggleCommentLike);

// 4. Toggle Tweet Like: POST /api/v1/likes/toggle/t/:tweetId
router.route("/toggle/t/:tweetId").post(toggleTweetLike);

// 5. Get All Liked Videos: GET /api/v1/likes/videos
router.route("/videos").get(getLikedVideos);

export default router;