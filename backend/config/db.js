// backend/src/config/db.js
import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not set in .env");

  try {
    // connect with a 30s server selection timeout
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
    console.log("MongoDB connected:", mongoose.connection.host);
  } catch (err) {
    console.error("MongoDB connection error:", err && err.message ? err.message : err);
    throw err;
  }
}

export default connectDB;
