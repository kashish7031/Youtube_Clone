// backend/src/routes/channelRoutes.js
import express from "express";
import Channel from "../models/Channel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const channels = await Channel.find().populate("user", "username");
    res.json({ ok: true, channels });
  } catch (err) {
    console.error("GET /api/channel error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
