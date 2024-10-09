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
  package: {
    type: String,
  },
  billStatus: {
    type: Boolean,
  }, 
});

const User = mongoose.model("User", UserSchema);
export default User;
  