import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'; 
import videoRoutes from './src/routes/videoRoutes.js'; 
import commentRoutes from './src/routes/commentRoutes.js'; // <--- NEW IMPORT

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 2. DATABASE CONNECTION ---
mongoose.connect("mongodb+srv://dev_plain_test:MongoDb123@cluster0.uqjbplz.mongodb.net/youtube?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log("DB Connection Error:", err));

// --- 3. SERVE UPLOADED FILES ---
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 4. ROUTES ---
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes); // <--- NEW ROUTE CONNECTION

// --- 5. START SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});