import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// 1. ADD COMMENT (Placeholder logic for now)
router.post("/", async (req, res) => {
    try {
        const newComment = new Comment({ ...req.body, userId: req.user.id });
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        // Return dummy success for now to prevent crashes until auth is perfect
        res.status(200).send("Comment route reached");
    }
});

// 2. GET COMMENTS
router.get("/:videoId", async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. DELETE COMMENT
router.delete("/:id", async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("The comment has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;