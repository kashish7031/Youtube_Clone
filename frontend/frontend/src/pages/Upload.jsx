const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

/**
 * GET /api/videos/stream/:filename
 * Serves video file with Range support for seeking & partial content (206)
 */
router.get("/stream/:filename", (req, res) => {
  const { filename } = req.params;
  const videoPath = path.join(__dirname, "..", "uploads", filename);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ message: "Video file not found" });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    // no Range header -> send entire file
    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": fileSize,
    });
    fs.createReadStream(videoPath).pipe(res);
    return;
  }

  // parse range: e.g. "bytes=0-"
  const CHUNK_SIZE = 10 ** 6; // 1MB chunk
  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + CHUNK_SIZE, fileSize - 1);

  if (start >= fileSize) {
    res.writeHead(416, { "Content-Range": `bytes */${fileSize}` });
    return res.end();
  }

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const stream = fs.createReadStream(videoPath, { start, end });
  stream.pipe(res);
});

module.exports = router;
