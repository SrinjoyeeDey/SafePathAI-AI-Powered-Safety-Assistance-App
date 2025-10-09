import { Router } from "express";

import { handleChatbotQuery } from '../controllers/chatbotController';

const router=Router()

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI-powered chatbot for safety and location assistance
 */

/**
 * @swagger
 * /ai/query:
 *   post:
 *     summary: Interact with the AI chatbot
 *     description: >
 *       Sends a message to the AI assistant.
 *       - If the message is a simple greeting or question, it provides a conversational reply.
 *       - If the message contains keywords like 'hospital', 'police', or 'pharmacy', it requires latitude and longitude to find the nearest place.
 *       - It then uses Mapbox to find the location and directions, and an AI model (Groq) to format a user-friendly response.
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The user's query for the chatbot.
 *               latitude:
 *                 type: number
 *                 description: The user's current latitude. Required for location-based queries.
 *               longitude:
 *                 type: number
 *                 description: The user's current longitude. Required for location-based queries.
 *             required:
 *               - message
 *           examples:
 *             conversational:
 *               summary: A simple greeting
 *               value:
 *                 message: "Hello, what can you do?"
 *             location_search:
 *               summary: A search for a nearby place
 *               value:
 *                 message: "I need to find a nearby police station"
 *                 latitude: 40.7128
 *                 longitude: -74.0060
 *     responses:
 *       '200':
 *         description: Successful response from the AI.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *             examples:
 *               conversational_reply:
 *                 summary: AI greeting response
 *                 value:
 *                   reply: "Hi! I can find nearby hospitals, police stations, or pharmacies. What do you need?"
 *               location_reply:
 *                 summary: AI location and directions response
 *                 value:
 *                   reply: "The nearest police station is the NYPD 1st Precinct at 16 Ericsson Pl, New York. It's about 5 minutes away. Head north on Broadway toward Chambers St, then turn left."
 *       '400':
 *         description: Bad Request - Missing required fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Message is required."
 *       '500':
 *         description: Internal Server Error - API keys might be missing or an external service failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to process AI request."
 */

router.post('/query', handleChatbotQuery);

export default router;