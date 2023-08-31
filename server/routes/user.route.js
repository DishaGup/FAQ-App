const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

userRouter.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use a higher value for security

    // Create a new user with the hashed password
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      "orion"
    );

    // Send token and user ID to the client
    res.status(201).json({ token, role: newUser.role, userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Email not exists! Please register" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, "orion");

    // Send token to the client
    res.json({ token, role: user.role, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});
userRouter.put("/:userId/change-role", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newRole = user.role === "User" ? "Admin" : "User";

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role: newRole } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User role updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = userRouter;
