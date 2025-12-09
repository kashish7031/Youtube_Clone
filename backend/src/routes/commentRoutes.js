// backend/src/routes/commentRoutes.js
import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

router.get("/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId }).populate("user", "username");
    res.json({ ok: true, comments });
  } catch (err) {
    console.error("GET /api/comments error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, user, video } = req.body;
    if (!text || !user || !video) return res.status(400).json({ message: "Missing fields" });
    const comment = await Comment.create({ text, user, video });
    res.json({ ok: true, comment });
  } catch (err) {
    console.error("POST /api/comments error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
