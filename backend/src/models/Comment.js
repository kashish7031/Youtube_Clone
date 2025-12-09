import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String, // In a real app, use mongoose.Schema.Types.ObjectId
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);