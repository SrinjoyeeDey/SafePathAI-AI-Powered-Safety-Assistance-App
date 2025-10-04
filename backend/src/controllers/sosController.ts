import { Response } from "express";
import SOS from "../models/SOS";
import { AuthRequest } from "../types/types";

export async function sendSOS(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { message, lng, lat, contacts } = req.body;

    if (typeof lng !== "number" || typeof lat !== "number")
      return res.status(400).json({ message: "lat & lng required" });

    const sos = await SOS.create({
      user: userId,
      message,
      location: { type: "Point", coordinates: [lng, lat] },
      contactsSentTo: contacts || [],
      status: "pending",
    });

    // SMS / Twilio integration can go here
    const shareText = `SOS! I need help. Location: https://www.google.com/maps?q=${lat},${lng} - Message: ${message || "Please help"}`;

    res.status(201).json({ ok: true, sos, shareText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
