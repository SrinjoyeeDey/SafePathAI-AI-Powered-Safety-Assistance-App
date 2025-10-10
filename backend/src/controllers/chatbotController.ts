// ...existing code...
import { Request, Response } from 'express';
import axios from 'axios';

export const handleChatbotQuery = async (req: Request, res: Response) => {
  const { message, latitude, longitude } = req.body;

  // Only require a message at this stage
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const MAPBOX_KEY = process.env.MAPBOX_API_KEY;
  const GROQ_KEY = process.env.GROQ_API_KEY;

  if (!MAPBOX_KEY || !GROQ_KEY) {
    return res.status(500).json({ error: "API keys are not configured on the server." });
  }

  try {
    const text = String(message).toLowerCase().trim();

    // Simple intent detection
    const isGreeting = /\b(hi|hello|hey|yo|hola|namaste)\b/.test(text);
    const isHelp = /\b(help|what can you do|how (do|can) you help)\b/.test(text);

    // Map common synonyms to categories
    const categoryMap: Record<string, string> = {
      hospital: 'hospital',
      clinic: 'hospital',
      emergency: 'hospital',
      er: 'hospital',
      pharmacy: 'pharmacy',
      chemist: 'pharmacy',
      drugstore: 'pharmacy',
      medicine: 'pharmacy',
      police: 'police_station',
      'police station': 'police_station',
      cops: 'police_station',
      security: 'police_station',
    };

    let category: string | null = null;
    for (const [key, value] of Object.entries(categoryMap)) {
      if (text.includes(key)) {
        category = value;
        break;
      }
    }

    // If it's a greeting or no category detected, do conversational reply instead of Mapbox query
    if (isGreeting || isHelp || !category) {
      const prompt = `You are a concise, friendly safety assistant. Greet the user briefly and explain you can find nearby hospitals, police stations, or pharmacies using their location. If they didn't specify what they need, ask a short clarifying question. Keep it under 2 short sentences.

User message: "${message}"`;

      const groqUrl = "https://api.groq.com/openai/v1/chat/completions";
      const groqResponse = await axios.post(
        groqUrl,
        {
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
          ],
          model: "llama-3.1-8b-instant"
        },
        { headers: { Authorization: `Bearer ${GROQ_KEY}` } }
      );

      const aiReply = groqResponse.data?.choices?.[0]?.message?.content?.trim()
        || "Hi! I can find nearby hospitals, police stations, or pharmacies. What do you need?";
      return res.status(200).json({ reply: aiReply });
    }

    // At this point we do need location to search
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: "Location (latitude and longitude) is required to find nearby places." });
    }

    // --- STEP 1: Find the nearest place using the Search Box API ---
    const searchUrl =
      `https://api.mapbox.com/search/searchbox/v1/category/${encodeURIComponent(category)}?` +
      `access_token=${MAPBOX_KEY}&proximity=${longitude},${latitude}&language=en&limit=1`;
    const searchResponse = await axios.get(searchUrl);

    if (searchResponse.data && Array.isArray(searchResponse.data.features) && searchResponse.data.features.length > 0) {
      const bestResult = searchResponse.data.features[0];
      const destinationName = bestResult?.properties?.name || "Unknown";
      const destinationAddress = bestResult?.properties?.full_address || "Address unavailable";
      const destinationCoords = bestResult?.geometry?.coordinates; // [lng, lat]

      let steps: string[] = [];
      let durationMins: number | null = null;

      if (Array.isArray(destinationCoords) && destinationCoords.length === 2) {
        // --- STEP 2: Get the route using the Directions API ---
        const directionsUrl =
          `https://api.mapbox.com/directions/v5/mapbox/driving/` +
          `${longitude},${latitude};${destinationCoords[0]},${destinationCoords[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_KEY}`;
        const directionsResponse = await axios.get(directionsUrl);
        const route = directionsResponse.data?.routes?.[0];
        const leg = route?.legs?.[0];

        if (leg?.steps) {
          steps = leg.steps.map((s: any) => s?.maneuver?.instruction).filter(Boolean);
        }
        if (route?.duration != null) {
          durationMins = Math.max(1, Math.round(route.duration / 60));
        }
      }

      // --- STEP 3: Create a detailed prompt for the AI ---
      const prompt = `You are a helpful safety assistant. A user asked for the nearest "${category}".
The best result found is:
- Name: ${destinationName}
- Address: ${destinationAddress}
${durationMins ? `- Estimated travel time: ${durationMins} minutes.` : ''}

${steps.length ? `The step-by-step directions are: ${steps.join('. ')}.` : 'Directions are currently unavailable.'}

Present this information clearly and concisely. Start with the name and address, then travel time (if available), then the directions or a brief note if directions are unavailable.`;

      const groqUrl = "https://api.groq.com/openai/v1/chat/completions";
      const groqResponse = await axios.post(
        groqUrl,
        {
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
          ],
          model: "llama-3.1-8b-instant"
        },
        { headers: { Authorization: `Bearer ${GROQ_KEY}` } }
      );

      const aiReply = groqResponse.data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
      return res.status(200).json({ reply: aiReply });

    } else {
      const noResultReply = `I couldn't find any nearby results for that. Try asking for a hospital, police station, or pharmacy.`;
      return res.status(200).json({ reply: noResultReply });
    }

  } catch (error: any) {
    console.error("Error processing AI query:", error?.response?.data || error?.message || error);
    return res.status(500).json({ error: "Failed to process AI request." });
  }
};
// ...existing code...