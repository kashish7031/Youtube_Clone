import express from 'express';
import Video from '../models/Video.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)){ fs.mkdirSync(uploadDir, { recursive: true }); }

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, uploadDir); },
  filename: (req, file, cb) => { cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); }
});
const upload = multer({ storage: storage });

// --- UPLOAD ROUTE (Hybrid: File OR Text) ---
router.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'video' }]), async (req, res) => {
  try {
    const baseUrl = "http://localhost:5000/uploads/";
    
    // 1. Check for Text URL first
    let thumbnailPath = req.body.thumbnailUrl; 
    let videoPath = req.body.videoUrl; 

    // 2. Overwrite if File exists
    if (req.files && req.files['thumbnail']) thumbnailPath = baseUrl + req.files['thumbnail'][0].filename;
    if (req.files && req.files['video']) videoPath = baseUrl + req.files['video'][0].filename;

    if (!videoPath) return res.status(400).json({ message: "No video provided!" });

    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      uploader: req.body.uploader, 
      channelId: req.body.channelId,
      thumbnailUrl: thumbnailPath, 
      videoUrl: videoPath,
      views: 0, likes: 0, dislikes: 0
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (err) { res.status(500).json(err); }
});

router.get('/find/:id', async (req, res) => {
  try { const video = await Video.findById(req.params.id); res.status(200).json(video); } 
  catch (err) { res.status(500).json(err); }
});

router.get('/', async (req, res) => {
  const query = req.query.q;
  try {
    if (query) { const videos = await Video.find({ title: { $regex: query, $options: "i" } }); res.status(200).json(videos); } 
    else { const videos = await Video.find(); res.status(200).json(videos); }
  } catch (err) { res.status(500).json(err); }
});

router.get('/user/:userId', async (req, res) => {
  try { const videos = await Video.find({ uploader: req.params.userId }); res.status(200).json(videos); } 
  catch (err) { res.status(500).json(err); }
});

router.delete('/:id', async (req, res) => {
  try { await Video.findByIdAndDelete(req.params.id); res.status(200).json("Deleted"); } 
  catch (err) { res.status(500).json(err); }
});

router.put('/:id', async (req, res) => {
  try { const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }); res.status(200).json(updatedVideo); } 
  catch (err) { res.status(500).json(err); }
});

router.put('/view/:id', async (req, res) => {
  try { await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }); res.status(200).json("Viewed"); } 
  catch (err) { res.status(500).json(err); }
});

router.put('/like/:id', async (req, res) => {
  try { const video = await Video.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true }); res.status(200).json(video); } 
  catch (err) { res.status(500).json(err); }
});

router.put('/dislike/:id', async (req, res) => {
  try { const video = await Video.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true }); res.status(200).json(video); } 
  catch (err) { res.status(500).json(err); }
});

export default router;