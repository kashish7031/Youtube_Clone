// backend/src/routes/videoRoutes.js
import express from 'express';
import Video from '../models/Video.js'; // Ensure this path matches your folder structure

const router = express.Router();

// 1. CREATE: Upload a new video
router.post('/', async (req, res) => {
  const newVideo = new Video(req.body);
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. READ: Get all videos (for Home Page)
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. READ: Get videos for a specific User/Channel (For Channel Page)
router.get('/user/:userId', async (req, res) => {
  try {
    const videos = await Video.find({ uploader: req.params.userId });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4. UPDATE: Edit video details
router.put('/:id', async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 5. DELETE: Delete a video
router.delete('/:id', async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("The video has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;