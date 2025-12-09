import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'; 

// --- IMPORTS ---
import videoRoutes from './src/routes/videoRoutes.js'; 
import commentRoutes from './src/routes/commentRoutes.js';
import authRoutes from './src/routes/authRoutes.js'; // <--- 1. NEW IMPORT

const app = express();

app.use(cors());
app.use(express.json());

// --- DB CONNECTION ---
mongoose.connect("mongodb+srv://dev_plain_test:MongoDb123@cluster0.uqjbplz.mongodb.net/youtube?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log("DB Connection Error:", err));

// --- SERVE FILES ---
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES ---
app.use('/api/auth', authRoutes);       // <--- 2. CRITICAL FIX: Login now works
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});