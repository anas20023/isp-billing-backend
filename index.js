import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import bodypaser from "body-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodypaser.json());
connectDB();

// Allow all origins in CORS
app.use(
  cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
