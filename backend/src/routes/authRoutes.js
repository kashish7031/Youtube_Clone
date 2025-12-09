// backend/src/routes/authRoutes.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ message: "User exists" });

    const user = await User.create({ username, email, password });
    return res.status(201).json({ message: "User created", userId: user._id });
  } catch (err) {
    console.error("auth/register error:", err);
    return res.status(500).json({ message: "Server error", error: err.message || err });
  }
});

// login (simple demo)
router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    // Return limited info — in a real app return a JWT.
    return res.json({ message: "Login success", userId: user._id });
  } catch (err) {
    console.error("auth/login error:", err);
    return res.status(500).json({ message: "Server error", error: err.message || err });
  }
});

export default router;
