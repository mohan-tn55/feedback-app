import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import feedbackRouter from "./routes/feedbackRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/feedback", feedbackRouter);

// Health check route
app.get("/", (req, res) => {
  res.json({ success: true, message: "FeedbackHub API is running." });
});

// Database Connection
connectDB().catch((err) => console.error("MongoDB Error:", err));

// Vercel deploy
if(process.env.NODE_ENV !== "production") {
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}

export default app;
