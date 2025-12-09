import express from 'express';
import Video from '../models/Video.js'; 

const router = express.Router();

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LIKE A VIDEO
router.put('/like/:videoId', async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json("Video not found");
    
    // Simple increment logic
    video.likes += 1;
    await video.save();
    
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DISLIKE A VIDEO
router.put('/dislike/:videoId', async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json("Video not found");

    video.dislikes += 1;
    await video.save();

    res.status(200).json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SEED DATA ROUTE (Keep your existing seed route here)
router.post('/seed', async (req, res) => {
  // ... (Keep your existing seed code from previous steps)
  res.json({ message: "Seed route exists" });
});

export default router;