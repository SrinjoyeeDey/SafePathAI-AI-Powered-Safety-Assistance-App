import User from "../models/User";

import { Response } from "express";
import { AuthRequest } from "../types/types";

export const sendSOS = async (req: AuthRequest, res: Response) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.userId;

    if (!latitude || !longitude)
      return res.status(400).json({ message: "Missing coordinates" });

    const user = await User.findById(userId).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Notify favorites
    const favorites = user.favorites || [];
    if (favorites.length === 0)
      return res.status(200).json({ message: "SOS sent, but no favorites linked." });

    // Example mock notification system (can be replaced with Twilio or Email API)
    favorites.forEach((fav) => {
      console.log(
        `🚨 ALERT: ${fav.name} notified about ${user.name}'s emergency at (${latitude}, ${longitude})`
      );
    });

    return res.status(200).json({ message: "SOS alert sent to favorites." });
  } catch (err) {
    console.error("Error sending SOS:", err);
    res.status(500).json({ message: "Server error while sending SOS." });
  }
};
