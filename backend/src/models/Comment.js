// backend/src/models/Comment.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);
