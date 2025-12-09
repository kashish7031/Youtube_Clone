// backend/src/models/Channel.js
import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subscribers: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Channel || mongoose.model("Channel", channelSchema);
