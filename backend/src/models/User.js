import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  avatar: { 
    type: String, 
    default: "https://via.placeholder.com/150" 
  },
  channels: [{ type: String }] 
}, { timestamps: true });

// NOTE: We are NOT using a pre-save hook here to avoid double-hashing conflicts.
// We will handle hashing manually in the authRoutes.js controller.

export default mongoose.model('User', userSchema);