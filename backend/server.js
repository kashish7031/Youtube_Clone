// backend/server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins (dev)
const ALLOWED_ORIGINS = new Set([
  "http://localhost:5173",   // Vite dev server (your frontend)
  "http://127.0.0.1:5173",   // sometimes requests come from 127.0.0.1
]);

// CORS options with dynamic origin check so the Access-Control-Allow-Origin
// header will match the actual frontend origin when permitted.
const corsOptions = {
  origin: function (origin, callback) {
    // `origin` is undefined for some same-origin requests (e.g. server-to-server),
    // allow those through. If you want to be strict, treat undefined as disallowed.
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.has(origin)) {
      return callback(null, true);
    } else {
      console.warn("Blocked CORS request from origin:", origin);
      return callback(new Error("CORS: Origin not allowed"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
  optionsSuccessStatus: 204, // some browsers prefer 204 for preflight
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Make sure express can parse JSON bodies BEFORE your routes
app.use(express.json());

// Optional: quick health endpoint
app.get("/", (req, res) => res.json({ ok: true, message: "API running" }));

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

// Optional generic error handler (will surface CORS errors too)
app.use((err, req, res, next) => {
  console.error("Unhandled error middleware:", err && (err.stack || err.message || err));
  if (err && err.message && err.message.startsWith("CORS")) {
    return res.status(403).json({ ok: false, message: "CORS error", error: err.message });
  }
  res.status(err && err.status ? err.status : 500).json({
    ok: false,
    message: "Server error",
    error: err && err.message ? err.message : String(err),
  });
});

// connect and start
async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected:", mongoose.connection.host);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err.message || err);
    process.exit(1);
  }
}

start();

export default app;
