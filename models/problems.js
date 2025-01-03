import mongoose from "mongoose";
// Define the schema for a Problem
const problemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true, 
    },
    difficulty: {
      type: Number,
      required: true, 
    },
    link: {
      type: String,
      required: true, 
      match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i, 
    },
  },
); 

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
