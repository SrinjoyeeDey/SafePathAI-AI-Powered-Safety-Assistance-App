import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import placesRoutes from "./routes/placesRoutes";
import aiRoutes from "./routes/aiRoutes";
import sosRoutes from "./routes/sosRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);

// Rate limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests, please try again later",
    error: "RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many authentication attempts, please try again later",
    error: "AUTH_RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    message: "Too many password reset requests, please try again later",
    error: "RESET_RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply general rate limiter to all API routes
app.use("/api/", generalLimiter);

// Apply specific rate limiters to auth routes
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/signup", authLimiter);
app.use("/api/auth/refresh", authLimiter);
app.use("/api/auth/forgot-password", passwordResetLimiter);
app.use("/api/auth/reset-password", passwordResetLimiter);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/favorites", favoriteRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => res.json({ ok: true, ts: Date.now() }));

// 404 handler - must be placed after all routes
app.use(notFound);

// Global error handling middleware - must be the last middleware
app.use(errorHandler);

async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set in .env");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.log("Failed to start server: ", err);
    process.exit(1);
  }
}

start();
