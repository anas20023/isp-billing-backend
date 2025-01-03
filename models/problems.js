import mongoose from "mongoose";


const problemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, e
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
      unique: true, 
    },
  },
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
