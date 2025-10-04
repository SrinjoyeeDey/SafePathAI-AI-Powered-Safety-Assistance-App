import { Request, Response } from "express";
import { askGemini } from "../services/aiService"; 
import Place from "../models/Place";

// Controller to handle AI queries with geolocation context
export async function queryAI(req: Request, res: Response) {
  try {
    const { prompt, lat, lng } = req.body;

    // Validate input
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    // Enrich context: find nearby places in DB (MongoDB)
    let context = "";
    if (typeof lat === "number" && typeof lng === "number") {
      const nearbyPlaces = await Place.find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [lng, lat] },
            $maxDistance: 3000 // 3 km radius
          }
        }
      }).limit(5);

      if (nearbyPlaces.length) {
        context += "Nearby places:\n";
        nearbyPlaces.forEach(place => {
          context += `- ${place.name} (${place.type}) at ${place.address || "unknown"}\n`;
        });
      }
    }

    // Define system prompt for Gemini
    const systemPrompt = "You are a safety assistant. Provide short actionable advice and nearby safe spots.";

    // Combine user prompt with context
    const userPrompt = `${context}\nUser: ${prompt}`;

    // Call Gemini API
    const responseText = await askGemini(systemPrompt, userPrompt);

    // Send response back to frontend
    res.json({ response: responseText });
  } catch (error: any) {
    console.error("AI Controller Error:", error);
    res.status(500).json({ message: "Failed to get AI response" });
  }
}