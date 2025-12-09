import express from "express";
import Comment from "../models/Comment.js";
import User from "../models/User.js"; // Ensure .js is present

const router = express.Router();

// ADD COMMENT
router.post("/", async (req, res) => {
  try {
    const newComment = new Comment({ ...req.body });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET COMMENTS FOR A VIDEO
router.get("/:videoId", async (req, res) => {
  try {
    // Populate shows user details instead of just ID
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("userId", "username avatar"); 
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;