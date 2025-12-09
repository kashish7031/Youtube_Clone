// backend/src/routes/videoRoutes.js
import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

// GET /api/videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).lean();
    return res.json({ ok: true, videos });
  } catch (err) {
    console.error("videos GET error:", err);
    return res.status(500).json({ message: "Server error", error: err.message || err });
  }
});

export default router;
