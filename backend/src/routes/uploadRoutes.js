// backend/src/routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`);
  }
});
const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  return res.json({ ok: true, file: req.file.filename, path: `/uploads/${req.file.filename}` });
});

export default router;
