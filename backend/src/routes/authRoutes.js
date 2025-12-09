import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

const router = express.Router();

// --- REGISTER ---
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check existing
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // HASHING HAPPENS HERE (AND ONLY HERE)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword 
    });
    
    await newUser.save();
    console.log("✅ User Registered:", email); // Server Log

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please Register." });
    }

    // 2. Compare Password
    // We compare the plain text 'password' with the 'user.password' hash from DB
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log("❌ Password Mismatch for:", email);
      return res.status(400).json({ message: "Wrong Password" });
    }

    // 3. Success
    const token = jwt.sign({ id: user._id }, "secret_key_123", { expiresIn: "1h" });
    const { password: _, ...userData } = user._doc;
    
    console.log("✅ Login Success:", email);
    res.json({ token, user: userData });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;