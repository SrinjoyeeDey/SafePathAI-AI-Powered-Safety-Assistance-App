import { Router } from "express";
import FavoriteContact from "../models/FavoriteContact";
import { verifyAccessToken } from "../middleware/auth";

const router = Router();

// Get all favorites for a user
router.get("/", verifyAccessToken, async (req: any, res) => {
  const contacts = await FavoriteContact.find({ user: req.userId });
  res.json(contacts);
});

// Add new favorite
router.post("/", verifyAccessToken, async (req: any, res) => {
  const { name, phone, email } = req.body;
  const contact = await FavoriteContact.create({
    user: req.userId,
    name,
    phone,
    email,
  });
  res.status(201).json(contact);
});

// Update favorite
router.put("/:id", verifyAccessToken, async (req: any, res) => {
  const contact = await FavoriteContact.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  res.json(contact);
});

// Delete favorite
router.delete("/:id", verifyAccessToken, async (req: any, res) => {
  await FavoriteContact.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });
  res.json({ success: true });
});

export default router;
