// backend/src/routes/videoStream.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Example: stream a file from uploads by filename query ?file=NAME
router.get("/", (req, res) => {
  const file = req.query.file;
  if (!file) return res.status(400).send("Missing file query");
  const filePath = path.join(process.cwd(), "uploads", file);
  if (!fs.existsSync(filePath)) return res.status(404).send("Not found");
  const stat = fs.statSync(filePath);
  const total = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
    if (start >= total || end >= total) {
      res.status(416).send("Requested range not satisfiable\n" + start + " >= " + total);
      return;
    }
    const chunkSize = (end - start) + 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4"
    });
    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": "video/mp4"
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

export default router;
