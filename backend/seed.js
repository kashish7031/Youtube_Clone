// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Video from "./src/models/Video.js";

dotenv.config();

async function run() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    await User.deleteMany({});
    await Video.deleteMany({});

    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "123456"
    });

    await Video.create({
      title: "Sample Video",
      description: "This is a test video",
      url: "https://example.com/video.mp4",
      user: user._id
    });

    console.log("Seed completed");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}

run();
