import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'; // <--- Ensure this is imported
import videoRoutes from './src/routes/videoRoutes.js'; 

const app = express();

app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// (Your connection string is fine, keep it as is)
mongoose.connect("mongodb+srv://dev_plain_test:MongoDb123@cluster0.uqjbplz.mongodb.net/youtube?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log("DB Connection Error:", err));

// --- CRITICAL FIX: SERVE STATIC FILES ---
// This tells the server: "If someone asks for /uploads, look in the folder on my computer"
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES ---
app.use('/api/videos', videoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});