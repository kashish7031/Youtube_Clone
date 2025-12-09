import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  description: { type: String, required: true },
  channelId: { type: String, required: true },
  uploader: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  category: { type: String, default: "All", required: true }, // Added for Filters
  videoUrl: { type: String, required: true } // Added for Video Player
});

export default mongoose.model('Video', videoSchema);