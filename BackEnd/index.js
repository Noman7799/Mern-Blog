import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import routes
import userRoutes from "./Routes/user.route.js"
import authRoutes from "./Routes/auth.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const URL = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

// Routes

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
