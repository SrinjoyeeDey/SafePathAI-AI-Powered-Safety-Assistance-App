import { Request, Response } from "express";
import { AuthRequest } from "../types/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { generateAccessToken, generateRefreshToken, generatePasswordResetToken, verifyPasswordResetToken } from "../utils/jwt";
import { sendPasswordResetEmail, sendPasswordChangeConfirmation } from "../utils/email";
import { randomBytes } from "crypto";

const SALT_ROUNDS = 10;

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password, lat, lng } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "Missing fields (name, email and password are required)",
        error: "MISSING_FIELDS"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Invalid email format",
        error: "INVALID_EMAIL"
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ 
        message: "User already exists",
        error: "USER_EXISTS"
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userData: any = { name, email, passwordHash };

    if (typeof lat === "number" && typeof lng === "number") {
      userData.lastLocation = { type: "Point", coordinates: [lng, lat] };
    }

    const user = await User.create(userData);

    const accessToken = generateAccessToken(user._id.toString());
    const tokenId = randomBytes(16).toString("hex");
    const refreshToken = generateRefreshToken(user._id.toString(), tokenId);

    user.refreshTokens.push(tokenId);
    await user.save();

    res.cookie("jid", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }, 
      accessToken 
    });

  } catch (err: any) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(409).json({ 
        message: 'Email already registered',
        error: "DUPLICATE_EMAIL"
      });
    }

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e: any) => e.message).join('; ');
      return res.status(400).json({ 
        message: messages || 'Validation error',
        error: "VALIDATION_ERROR"
      });
    }

    res.status(500).json({ 
      message: "Internal server error",
      error: "SERVER_ERROR"
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Missing fields",
        error: "MISSING_FIELDS"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: "Invalid credentials",
        error: "INVALID_CREDENTIALS"
      });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).json({ 
        message: "Invalid credentials",
        error: "INVALID_CREDENTIALS"
      });
    }

    const accessToken = generateAccessToken(user._id.toString());
    const tokenId = randomBytes(16).toString("hex");
    const refreshToken = generateRefreshToken(user._id.toString(), tokenId);

    user.refreshTokens.push(tokenId);
    await user.save();

    res.cookie("jid", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }, 
      accessToken 
    });
  } catch (err: any) {
    res.status(500).json({ 
      message: "Internal server error",
      error: "SERVER_ERROR"
    });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const token = req.cookies.jid;
    
    if (!token) {
      return res.status(401).json({ 
        message: "No refresh token",
        error: "NO_REFRESH_TOKEN"
      });
    }

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
    const { userId, tokenId } = payload;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ 
        message: "Invalid refresh token (user not found)",
        error: "USER_NOT_FOUND"
      });
    }

    if (!user.refreshTokens.includes(tokenId)) {
      return res.status(401).json({ 
        message: "Refresh token revoked",
        error: "TOKEN_REVOKED"
      });
    }

    user.refreshTokens = user.refreshTokens.filter(t => t !== tokenId);
    const newTokenId = randomBytes(16).toString("hex");
    user.refreshTokens.push(newTokenId);
    await user.save();

    const newAccessToken = generateAccessToken(user._id.toString());
    const newRefreshToken = generateRefreshToken(user._id.toString(), newTokenId);

    res.cookie("jid", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken: newAccessToken });
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ 
        message: "Refresh token has expired",
        error: "TOKEN_EXPIRED"
      });
    }
    
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        message: "Invalid refresh token",
        error: "INVALID_TOKEN"
      });
    }

    res.status(401).json({ 
      message: "Invalid or expired refresh token",
      error: "TOKEN_VERIFICATION_FAILED"
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const token = req.cookies.jid;
    
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
        const { userId, tokenId } = payload;
        const user = await User.findById(userId);
        
        if (user) {
          user.refreshTokens = user.refreshTokens.filter(t => t !== tokenId);
          await user.save();
        }
      } catch (err) {
        // Silently fail
      }
    }
    
    res.clearCookie("jid", { path: "/api/auth/refresh" });
    res.json({ 
      ok: true, 
      message: "Logged out successfully" 
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Server error",
      error: "SERVER_ERROR"
    });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        message: "Email is required",
        error: "MISSING_EMAIL"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Invalid email format",
        error: "INVALID_EMAIL"
      });
    }

    const user = await User.findOne({ email });
    const successMessage = "If an account with that email exists, we've sent a password reset link.";

    if (!user) {
      return res.status(200).json({ message: successMessage });
    }

    const resetToken = generatePasswordResetToken(user._id.toString());
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    user.passwordResetUsed = false;
    await user.save();

    await sendPasswordResetEmail(email, resetToken, user.name);

    res.status(200).json({ message: successMessage });
  } catch (err: any) {
    res.status(500).json({ 
      message: "Internal server error",
      error: "SERVER_ERROR"
    });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ 
        message: "Token and password are required",
        error: "MISSING_FIELDS"
      });
    }

    const decoded = verifyPasswordResetToken(token);
    if (!decoded) {
      return res.status(400).json({ 
        message: "Invalid or expired reset token",
        error: "INVALID_TOKEN"
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.passwordResetToken !== token) {
      return res.status(400).json({ 
        message: "Invalid or expired reset token",
        error: "INVALID_TOKEN"
      });
    }

    if (user.passwordResetExpires && user.passwordResetExpires < new Date()) {
      return res.status(400).json({ 
        message: "Reset token has expired",
        error: "TOKEN_EXPIRED"
      });
    }

    if (user.passwordResetUsed) {
      return res.status(400).json({ 
        message: "Reset token has already been used",
        error: "TOKEN_ALREADY_USED"
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    user.passwordHash = passwordHash;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetUsed = true;
    user.refreshTokens = [];
    
    await user.save();

    await sendPasswordChangeConfirmation(user.email, user.name);

    res.status(200).json({ 
      message: "Password reset successfully. Please login with your new password.",
      success: true
    });
  } catch (err: any) {
    if (err.name === "JsonWebTokenError") {
      return res.status(400).json({ 
        message: "Invalid reset token",
        error: "INVALID_TOKEN"
      });
    }
    
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ 
        message: "Reset token has expired",
        error: "TOKEN_EXPIRED"
      });
    }
    
    res.status(500).json({ 
      message: "Internal server error",
      error: "SERVER_ERROR"
    });
  }
}

export async function updatePassword(req: AuthRequest, res: Response) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: "Current password and new password are required",
        error: "MISSING_FIELDS"
      });
    }

    // Password strength validation
    if (newPassword.length < 8) {
      return res.status(400).json({ 
        message: "New password must be at least 8 characters long",
        error: "PASSWORD_TOO_SHORT"
      });
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      return res.status(400).json({ 
        message: "New password must contain at least one lowercase letter, one uppercase letter, and one number",
        error: "PASSWORD_WEAK"
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ 
        message: "User not found",
        error: "USER_NOT_FOUND"
      });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ 
        message: "Current password is incorrect",
        error: "INCORRECT_PASSWORD"
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);
    if (isSamePassword) {
      return res.status(400).json({ 
        message: "New password must be different from current password",
        error: "SAME_PASSWORD"
      });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.passwordHash = newPasswordHash;
    await user.save();

    await sendPasswordChangeConfirmation(user.email, user.name);

    res.status(200).json({ 
      message: "Password updated successfully",
      success: true
    });
  } catch (err: any) {
    res.status(500).json({ 
      message: "Internal server error",
      error: "SERVER_ERROR"
    });
  }
}