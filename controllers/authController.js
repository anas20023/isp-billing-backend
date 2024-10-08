// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils.js";

export const register = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, " ", password);
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User created", userId: newUser._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

export const def = async (req, res) => {
  res.json({ message: "default route" });
};
