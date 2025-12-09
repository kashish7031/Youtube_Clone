const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URI;
console.log("Using MONGO_URI (first 140 chars):", uri ? uri.slice(0, 140) : "MONGO_URI missing");

async function test() {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log("✅ Connected to MongoDB:", mongoose.connection.host);
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection error (full):", err);
    if (err && err.message) console.error("message:", err.message);
    if (err && err.name) console.error("name:", err.name);
    process.exit(1);
  }
}
test();
