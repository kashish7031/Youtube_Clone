import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// 1. ADD COMMENT
router.post("/", async (req, res) => {
    try {
        const newComment = new Comment({ ...req.body });
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. GET COMMENTS BY VIDEO ID
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