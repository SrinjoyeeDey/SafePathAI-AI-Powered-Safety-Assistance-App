import {Router} from 'express'
import { nearby } from '../controllers/placesController'

const router=Router()

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: Find nearby places of interest
 */

/**
 * @swagger
 * /places/nearby:
 *   get:
 *     summary: Find nearby places
 *     description: >
 *       Finds nearby places of a specified type (e.g., hospital, police, pharmacy)
 *       based on the user's latitude and longitude using an external API like Mapbox.
 *     tags: [Places]
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: The user's current latitude.
 *         example: 40.7128
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: The user's current longitude.
 *         example: -74.0060
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [hospital, police, pharmacy]
 *         required: true
 *         description: The type of place to search for.
 *         example: hospital
 *     responses:
 *       '200':
 *         description: A list of nearby places.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *       '400':
 *         description: Bad Request - Missing required query parameters.
 *       '500':
 *         description: Internal Server Error.
 */
router.get("/nearby",nearby);

export default router;