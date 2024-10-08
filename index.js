// server.js
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
connectDB();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 