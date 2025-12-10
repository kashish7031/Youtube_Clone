import { Router } from 'express';
import { 
    getSubscribedChannels, 
    getUserChannelSubscribers, 
    toggleSubscription 
} from "../controllers/subscriptionController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = Router();

// Apply verifyJWT middleware to all routes in this file
// This ensures only logged-in users can subscribe
router.use(verifyJWT);

// 1. Toggle Subscription & Get Subscribers for a Channel
// Matches: /api/v1/subscriptions/c/:channelId
router
    .route("/c/:channelId")
    .get(getUserChannelSubscribers) // View who subscribes to a channel
    .post(toggleSubscription);      // Subscribe/Unsubscribe

// 2. Get Channels a User is Subscribed To
// Matches: /api/v1/subscriptions/u/:subscriberId
router.route("/u/:subscriberId").get(getSubscribedChannels);

export default router;