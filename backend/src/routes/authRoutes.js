import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/signup", async (req, res) => {
  try {
    // Create new user
    const newUser = new User({ ...req.body });
    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // 1. Find User
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found!");

    // 2. Check Password (Simple check for stability)
    // If you used bcrypt before, replace this line with bcrypt.compare
    if (req.body.password !== user.password) {
        return res.status(400).json("Wrong Credentials!");
    }

    // 3. Generate Token (Fake or Real)
    // We create a token so the frontend thinks we are logged in
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

    // 4. Send back user info (excluding password)
    const { password, ...others } = user._doc;
    
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(others);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;