// backend/checkEnvPrint.js
import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI (first 200 chars):", (process.env.MONGO_URI || "undefined").slice(0,200));
console.log("JWT_SECRET present:", process.env.JWT_SECRET ? "yes" : "no");
