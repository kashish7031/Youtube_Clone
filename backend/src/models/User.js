import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // FIX: Changed 'name' to 'username' to match your Registration Form
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribedUsers: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);