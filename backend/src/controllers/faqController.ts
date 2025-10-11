import { Request, Response } from "express";
import FAQ from "../models/FAQ";

export async function listFAQs(req: Request, res: Response) {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 });
    res.json({ faqs });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch FAQs" });
  }
}

export async function seedDefaultFAQs(req: Request, res: Response) {
  try {
    const count = await FAQ.countDocuments();
    if (count > 0) return res.json({ ok: true, seeded: false });
    const defaults = [
      { order: 1, category: "Safety", question: "How does SafePath AI detect unsafe locations?", answer: "We analyze patterns from reports, time of day, and environment signals to recommend safer routes." },
      { order: 2, category: "App Features", question: "Can I use SafePath offline?", answer: "Basic features like viewing saved SOS contacts and triggering SOS can work offline. Maps and AI need connectivity." },
      { order: 3, category: "Permissions", question: "What permissions are required?", answer: "Location permission for routing and safety alerts. Notification permission for SOS updates." },
      { order: 4, category: "SOS", question: "How does SOS work?", answer: "With one tap, we log your location and prepare alerts to your contacts. Messaging integrations are added when configured." }
    ];
    await FAQ.insertMany(defaults);
    res.json({ ok: true, seeded: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to seed FAQs" });
  }
}


