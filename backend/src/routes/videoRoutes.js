import express from 'express';
import Video from '../models/Video.js'; 

const router = express.Router();

// Upload Video
router.post('/', async (req, res) => {
  const newVideo = new Video(req.body);
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Videos by User ID (Needed for Channel Page)
router.get('/user/:userId', async (req, res) => {
  try {
    const videos = await Video.find({ uploader: req.params.userId });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Videos (With Search)
router.get('/', async (req, res) => {
  const query = req.query.q;
  try {
    if (query) {
      const videos = await Video.find({ title: { $regex: query, $options: "i" } });
      res.status(200).json(videos);
    } else {
      const videos = await Video.find();
      res.status(200).json(videos);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Video
router.delete('/:id', async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Video
router.put('/:id', async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;