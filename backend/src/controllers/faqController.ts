import { Request, Response } from "express";
import FAQ from "../models/FAQ";

export async function listFAQs(req: Request, res: Response) {
  try {
    const faqs = await FAQ.find();
    res.json({ faqs });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch FAQs" });
  }
}


