import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/signup", async (req, res) => {
  console.log("--- Register Attempt ---");
  console.log("Received Data:", req.body); // Check your terminal to see this!

  try {
    const newUser = new User({ ...req.body });
    await newUser.save();
    console.log("User Created Successfully!");
    res.status(200).send("User has been created!");
  } catch (err) {
    console.error("Register Error:", err);
    
    // BETTER ERROR HANDLING
    if (err.code === 11000) {
        // This is the code for "Duplicate Key" (User already exists)
        return res.status(409).send("User already exists! Try a different username or email.");
    }
    if (err.message) {
        // Send the specific error message (like "Path name is required")
        return res.status(500).send(err.message);
    }
    
    res.status(500).send("Unknown Server Error");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User not found!");

    if (req.body.password !== user.password) {
        return res.status(400).send("Wrong Credentials!");
    }

    const token = jwt.sign({ id: user._id }, "secretkey");
    const { password, ...others } = user._doc;
    
    res.status(200).json({ ...others, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;