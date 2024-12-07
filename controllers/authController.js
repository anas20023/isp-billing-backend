import User from "../models/User.js";
import Problem from "../models/problems.js";
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
export const addProblem = async (req, res) => {
  try {
    const { name, topic, difficulty, link } = req.body;

    if (!name || !topic || !difficulty || !link) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newProblem = new Problem({
      name,
      topic,
      difficulty,
      link,
    });

    await newProblem.save();

    return res
      .status(201)
      .json({ message: "Problem added successfully!", problem: newProblem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
export const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, topic, difficulty, link } = req.body;

    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      {
        name,
        topic,
        difficulty,
        link,
      },
      { new: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res
      .status(200)
      .json({
        message: "Problem updated successfully",
        problem: updatedProblem,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find(); // Fetch all problems from the database
    return res.status(200).json({ problems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
// Default route for testing
export const def = async (req, res) => {
  res.json({ message: "default route" });
};
