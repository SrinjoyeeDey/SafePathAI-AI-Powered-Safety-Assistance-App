import { Router } from "express";
import {me,updateLocation} from '../controllers/userController'
import {verifyAccessToken} from '../middleware/auth'

const router=Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and data management
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user's profile
 *     description: Retrieves the profile information for the currently authenticated user based on the provided JWT access token.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 location:
 *                   type: object
 *             example:
 *               _id: "60d0fe4f5311236168a109ca"
 *               name: "Jane Doe"
 *               email: "jane.doe@example.com"
 *               location:
 *                 type: "Point"
 *                 coordinates: [-74.0060, 40.7128]
 *       '401':
 *         description: Unauthorized - No token provided or token is invalid.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { message: "Unauthorized" }
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { message: "User not found" }
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { message: "Internal server error" }
 */
router.get("/me",verifyAccessToken,me);

/**
 * @swagger
 * /users/me/location:
 *   patch:
 *     summary: Update user's location
 *     description: Updates the last known location (latitude and longitude) of the authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *                 description: The user's current latitude.
 *               longitude:
 *                 type: number
 *                 description: The user's current longitude.
 *             required:
 *               - latitude
 *               - longitude
 *           example:
 *             latitude: 40.7128
 *             longitude: -74.0060
 *     responses:
 *       '200':
 *         description: Location updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location updated successfully"
 *       '400':
 *         description: Bad Request - Missing latitude or longitude.
 *       '401':
 *         description: Unauthorized - No token provided or token is invalid.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { message: "Unauthorized" }
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { message: "User not found" }
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { message: "Internal server error" }
 */
router.patch("/me/location",verifyAccessToken,updateLocation);

export default router;