import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js"; // <--- IMPORT THIS

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const ALLOWED_ORIGINS = new Set([
  "http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"
]);
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.has(origin)) return callback(null, true);
    return callback(new Error("CORS: Origin not allowed"), false);
  },
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes); // <--- ADD THIS

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

export default app;