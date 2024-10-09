import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils.js";

// Register function
export const register = async (req, res) => {
  try {
    const {
      username,
      password,
      packageName,
      packageSpeed,
      billStatus = false, // Default to false if not provided
      packagePrice,
    } = req.body;

   // console.log('Request Body:', req.body); // Log the full request body

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      packageName,
      packageSpeed,
      billStatus,
      packagePrice,
    });

    res.status(201).json({ message: "User created", userId: newUser._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};


// Login function
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" }); // User not found
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" }); // Wrong password
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Send response with token
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

// Fetch all users
export const allusers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Delete user
export const dltuser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and remove them
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Default route for testing
export const def = async (req, res) => {
  res.json({ message: "default route" });
};
 