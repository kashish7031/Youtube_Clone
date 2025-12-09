import mongoose from "mongoose";

// replace username, encoded password, and cluster host/db as needed
const uri = "mongodb+srv://dev_test_user:DevTest!2025@cluster0.zcpuvrz.mongodb.net/youtube?retryWrites=true&w=majority&authSource=admin";

console.log("🔍 Trying to connect with authSource=admin ...");

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log("✅ SUCCESS: Connected to MongoDB with authSource!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ FAILED:", err.message);
    process.exit(1);
  });
