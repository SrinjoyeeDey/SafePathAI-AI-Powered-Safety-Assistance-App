import express from "express";
import { verifyAccessToken } from "../middleware/auth";
import SOS from "../models/SOS";
// REMOVED: The line below was causing the "Cannot find module" error.
// import FavoriteContact from "../models/FavoriteContact";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SOS
 *   description: SOS emergency alert management
 */

/**
 * @swagger
 * /sos/send:
 *   post:
 *     summary: Send an SOS alert
 *     description: >
 *       Triggers an SOS alert for the authenticated user. This endpoint records the user's message and location,
 *       and is designed to eventually notify the user's emergency contacts.
 *       **Note:** The functionality to send notifications to contacts is not yet implemented.
 *     tags: [SOS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: A custom message to include in the SOS alert.
 *               location:
 *                 type: object
 *                 description: The user's current location in GeoJSON format.
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [Point]
 *                     default: Point
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     minItems: 2
 *                     maxItems: 2
 *                     description: "[longitude, latitude]"
 *             required:
 *               - message
 *               - location
 *           example:
 *             message: "I need help immediately, I am at the central park entrance."
 *             location:
 *               type: "Point"
 *               coordinates: [-73.9654, 40.7829]
 *     responses:
 *       '201':
 *         description: SOS alert created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 sos:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: string
 *                     message:
 *                       type: string
 *                     location:
 *                       type: object
 *                     status:
 *                       type: string
 *             example:
 *               success: true
 *               sos:
 *                 _id: "615c76d2f09f9e001f2a3b4c"
 *                 user: "615c76a0f09f9e001f2a3b4a"
 *                 message: "I need help immediately, I am at the central park entrance."
 *                 location:
 *                   type: "Point"
 *                   coordinates: [-73.9654, 40.7829]
 *                 contactsSentTo: []
 *                 status: "pending"
 *                 createdAt: "2023-10-05T14:48:00.000Z"
 *                 updatedAt: "2023-10-05T14:48:00.000Z"
 *       '401':
 *        description: Unauthorized - Invalid credentials.
 *        content:
 *          application/json:
 *            schema: { $ref: '#/components/schemas/Error' }
 *            example: { message: "Invalid credentials" }
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { message: "Internal server error" }
 */
router.post("/send", verifyAccessToken, async (req: any, res) => {
  try {
    const { message, location } = req.body;

    // COMMENTED OUT: The 'FavoriteContact' model doesn't exist in the project yet,
    // so this code is broken and needs to be commented out for now.
    /*
    const contacts = await FavoriteContact.find({ user: req.userId });
    const contactEmails = contacts.map(c => c.email).filter(Boolean);
    */

    // CHANGED: We'll pass an empty array for now since we don't have contacts yet.
    const contactEmails: string[] = [];

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