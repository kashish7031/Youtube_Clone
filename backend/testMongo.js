// backend/testMongo.js
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
console.log("Check .env loaded -> MONGO_URI present?:", uri ? "yes" : "no");
if (uri) console.log("MONGO_URI (first 140 chars):", uri.slice(0,140));
console.log("JWT_SECRET present?:", process.env.JWT_SECRET ? "yes" : "no");

(async () => {
  if (!uri) {
    console.error("❌ MONGO_URI missing. Ensure backend/.env exists and dotenv loads it.");
    process.exit(1);
  }

  try {
    // short timeout so failure is quick
    await mongoose.connect(uri, { dbName: "youtube", serverSelectionTimeoutMS: 15000 });
    console.log("✅ Connected to MongoDB!");
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    // Print concise message and full error object for debugging
    console.error("❌ Connection failed. Error message:");
    console.error(err && err.message ? err.message : err);
    console.error("Full error object (for debugging):");
    console.error(err);
    process.exit(1);
  }
})();
