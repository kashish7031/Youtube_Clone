import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// 1. IMPORT DATABASE CONNECTION
import connectDB from "./src/config/db.js"; 

// 2. IMPORT ROUTES
import authRoutes from "./src/routes/authRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import likeRoutes from "./src/routes/likeRoutes.js";
import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";

// Load environment variables
dotenv.config({
    path: './.env'
});

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARES ---
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// --- ROUTE DECLARATIONS ---
// This connects the URL to the Route File

// http://localhost:5000/api/v1/auth
app.use("/api/v1/auth", authRoutes);

// http://localhost:5000/api/v1/videos
app.use("/api/v1/videos", videoRoutes);

// http://localhost:5000/api/v1/comments
app.use("/api/v1/comments", commentRoutes);

// http://localhost:5000/api/v1/likes
app.use("/api/v1/likes", likeRoutes);

// http://localhost:5000/api/v1/subscriptions
app.use("/api/v1/subscriptions", subscriptionRoutes);


// --- START SERVER ---
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚙️  Server is running at port : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });