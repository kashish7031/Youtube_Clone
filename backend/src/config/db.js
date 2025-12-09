// backend/src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI missing in .env");

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      // mongoose 7+ uses defaults; don't pass legacy flags
    });
    console.log("MongoDB connected:", mongoose.connection.host);
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    throw err;
  }
}

export default connectDB;
