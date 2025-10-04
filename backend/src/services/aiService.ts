// src/services/aiService.ts
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const mapboxApiKey = process.env.MAPBOX_API_KEY;
console.log("Using Mapbox Key:", process.env.MAPBOX_API_KEY);


if (!geminiApiKey) throw new Error("GEMINI_API_KEY not set in .env");
if (!mapboxApiKey) throw new Error("MAPBOX_API_KEY not set in .env");

const genAI = new GoogleGenerativeAI(geminiApiKey);

export async function askGemini(
  systemPrompt?: string,
  userPrompt?: string,
  latitude?: number,
  longitude?: number
) {
  try {
    // Step 0: Ensure userPrompt is provided
    const finalUserPrompt = userPrompt?.trim();
    if (!finalUserPrompt) throw new Error("userPrompt is required");

    // Step 1: Default system prompt if none provided
    const finalSystemPrompt = systemPrompt?.trim() || `
    You are a helpful assistant that always considers the user's current location when giving recommendations.
    Incorporate nearby locations explicitly in your response.
    `;

    // Step 2: Fetch nearby POIs from Mapbox if coordinates provided
    let locationInfo = "No nearby locations available.";
    if (latitude != null && longitude != null) {
      // Search multiple types of safe/recreational areas
      const types = ["park", "garden", "stadium", "sports", "recreation", "community"];
      const promises = types.map(type =>
        axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(type)}.json?proximity=${longitude},${latitude}&limit=3&access_token=${mapboxApiKey}`
        )
      );

      const results = await Promise.all(promises);
      const allFeatures: any[] = [];

      results.forEach(res => {
        if (res.data.features && res.data.features.length > 0) {
          allFeatures.push(...res.data.features);
        }
      });

      if (allFeatures.length > 0) {
        // Remove duplicates by place_name
        const uniquePlaces = Array.from(new Set(allFeatures.map(f => f.place_name)))
          .slice(0, 5) // top 5 unique nearby places
          .map(f => `- ${f}`)
          .join("\n");
        locationInfo = uniquePlaces;
      } else {
        locationInfo = "No nearby safe walking locations found.";
      }
    }

    // Step 3: Build full prompt for Gemini
    const fullPrompt = `
${finalSystemPrompt}

    User question: ${finalUserPrompt}

    Coordinates: latitude ${latitude ?? "unknown"}, longitude ${longitude ?? "unknown"}.
    Nearby places (from Mapbox):
    ${locationInfo}

    ⚠️ Important: Provide detailed, actionable advice that explicitly uses the nearby locations if available.
    `;

    // Step 4: Send to Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return text || "No response from Gemini.";
  } catch (err: any) {
    console.error("AI Service Error:", err.message || err);
    throw new Error("Gemini AI request failed");
  }
}
