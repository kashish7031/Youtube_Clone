// testMongoNonSRV.js
import mongoose from "mongoose";

// >>> Credentials you provided (already filled)
const username = "dev_temp_user2";
const password = "DevTest2025";  // EXACT password based on your screenshot

// >>> Hosts (you provided)
const hosts = [
  "ac-8qmjbru-shard-00-00.zcpuvrz.mongodb.net:27017",
  "ac-8qmjbru-shard-00-01.zcpuvrz.mongodb.net:27017",
  "ac-8qmjbru-shard-00-02.zcpuvrz.mongodb.net:27017"
];

// >>> Database name
const dbName = "youtube";

// >>> Replica set name (Atlas default for your cluster)
const replicaSet = "atlas-8qmjbru-shard-0";

// >>> NON-SRV connection URI
const uri = `mongodb://${username}:${password}@${hosts.join(",")}/${dbName}?ssl=true&authSource=admin&retryWrites=true&w=majority&replicaSet=${replicaSet}`;

console.log("\n=== NON-SRV CONNECTION TEST (5s timeout) ===");
console.log("URI (masked):", uri.replace(/:[^:@]+@/, ":*****@"));
console.log("Attempting to connect...\n");

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 5000 })  // fail fast
  .then(() => {
    console.log("\n✅ NON-SRV TEST SUCCESS: Connected to MongoDB!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("\n❌ NON-SRV FAILED: message ->", err.message);
    console.error("❌ NON-SRV FAILED: stack ->", err.stack);

    if (err.reason) console.error("reason:", err.reason);
    if (err.code) console.error("code:", err.code);

    process.exit(1);
  });
