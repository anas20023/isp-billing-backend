// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  packageName: {
    // Renamed from usrpackage to packageName
    type: String,
    required: true,
  },
  packageSpeed: {
    // Added to match the frontend data structure
    type: String,
    required: true,
  },
  billStatus: {
    type: Boolean,
    required: true,
  },
  packagePrice: {
    type: String, // Kept as string to match the frontend requirement
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
