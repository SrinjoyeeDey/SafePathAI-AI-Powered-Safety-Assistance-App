import express from "express";
import { verifyAccessToken } from "../middleware/auth";
import SOS from "../models/SOS";
import FavoriteContact from "../models/FavoriteContact";


const router = express.Router();

router.post("/send", verifyAccessToken, async (req: any, res) => {
  try {
    const { message, location } = req.body;

    const contacts = await FavoriteContact.find({ user: req.userId });
    const contactEmails = contacts.map(c => c.email).filter(Boolean);

    const sos = await SOS.create({
      user: req.userId,
      message,
      location,
      contactsSentTo: contactEmails,
      status: "pending",
    });

    // TODO: Add email/SMS logic later
    res.status(201).json({ success: true, sos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send SOS" });
  }
});

export default router;