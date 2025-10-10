import { Request, Response } from "express";
import CheckIn from "../models/CheckIn";
import FavoriteContact from "../models/FavoriteContact";
import User from "../models/User";

// Create a new check-in request for the authenticated user
export async function createCheckIn(req: any, res: Response) {
  try {
    const userId = req.userId as string;
    const { dueAt, note, location } = req.body;

    if (!dueAt) return res.status(400).json({ message: "dueAt is required" });
    const dueDate = new Date(dueAt);
    if (isNaN(dueDate.getTime()))
      return res.status(400).json({ message: "dueAt must be a valid date" });

    const checkIn = await CheckIn.create({
      user: userId,
      dueAt: dueDate,
      note,
      location,
    });

    return res.status(201).json({ checkIn });
  } catch (err) {
    console.error("createCheckIn error", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// Confirm a pending check-in
export async function confirmCheckIn(req: any, res: Response) {
  try {
    const userId = req.userId as string;
    const { id } = req.params;

    const checkIn = await CheckIn.findOne({ _id: id, user: userId });
    if (!checkIn) return res.status(404).json({ message: "Check-in not found" });
    if (checkIn.status !== "pending")
      return res.status(400).json({ message: `Cannot confirm a ${checkIn.status} check-in` });

    checkIn.status = "confirmed";
    checkIn.confirmedAt = new Date();
    await checkIn.save();

    return res.json({ checkIn });
  } catch (err) {
    console.error("confirmCheckIn error", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// List user's check-ins (optionally filter by status)
export async function listMyCheckIns(req: any, res: Response) {
  try {
    const userId = req.userId as string;
    const { status } = req.query as { status?: string };

    const query: any = { user: userId };
    if (status) query.status = status;

    const items = await CheckIn.find(query).sort({ createdAt: -1 });
    return res.json({ items });
  } catch (err) {
    console.error("listMyCheckIns error", err);
    return res.status(500).json({ message: "Server error" });
  }
}
