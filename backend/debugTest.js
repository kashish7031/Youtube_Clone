// debugTest.js — verbose connection test (30s timeout)
import mongoose from "mongoose";
import util from "util";

const username = "dev_temp_user2";
const password = "DevTest2025"; // make sure this matches Atlas user password exactly
const hosts = [
  "ac-8qmjbru-shard-00-00.zcpuvrz.mongodb.net:27017",
  "ac-8qmjbru-shard-00-01.zcpuvrz.mongodb.net:27017",
  "ac-8qmjbru-shard-00-02.zcpuvrz.mongodb.net:27017"
];

const uri = `mongodb://${username}:${password}@${hosts.join(",")}/youtube?ssl=true&authSource=admin&retryWrites=true&w=majority&replicaSet=atlas-8qmjbru-shard-0`;

console.log("\n=== DEBUG TEST ===");
console.log("URI (masked):", uri.replace(/:[^:@]+@/, ":*****@"));
console.log("Connecting with 30s timeout...\n");

mongoose.set("debug", true);

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log("\n✅ DEBUG TEST SUCCESS: connected");
    process.exit(0);
  })
  .catch((err) => {
    // Print full inspect so we can see inner error fields
    console.error("\n❌ DEBUG TEST FAILED: err.message ->", err.message);
    console.error("Full error object:\n", util.inspect(err, { depth: 4 }));
    process.exit(1);
  });
