// backend/listUsers.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for listUsers");
  const users = await User.find().sort({ createdAt: 1 }).lean();
  console.log("Users:");
  users.forEach(u => {
    console.log(`- ${u._id} | ${u.username} | ${u.email} | created: ${u.createdAt}`);
  });
  await mongoose.disconnect();
  console.log("Disconnected");
}
run();
