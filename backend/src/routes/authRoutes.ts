import { Router } from "express";
import {signup,login,refresh,logout} from '../controllers/authController'

const router=Router()

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication, registration, and token management
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided name, email, and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's full name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address. Must be unique.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password (will be hashed).
 *             required:
 *               - name
 *               - email
 *               - password
 *           example:
 *             name: "Jane Doe"
 *             email: "jane.doe@example.com"
 *             password: "strongpassword123"
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *       '400':
 *         description: Bad Request - Missing required fields or invalid data.
 *       '409':
 *         description: Conflict - A user with this email already exists.
 *       '500':
 *         description: Internal Server Error.
 */
router.post("/signup",signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     description: Authenticates a user with their email and password. On success, it returns a short-lived JWT access token in the response body and sets a long-lived refresh token in an httpOnly cookie.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *             required:
 *               - email
 *               - password
 *           example:
 *             email: "jane.doe@example.com"
 *             password: "strongpassword123"
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Bad Request - Missing email or password.
 *       '401':
 *         description: Unauthorized - Invalid credentials.
 *       '500':
 *         description: Internal Server Error.
 */
router.post("/login",login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh the access token
 *     description: Generates a new access token using the refresh token stored in the httpOnly cookie. This endpoint should be called when the access token expires.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Access token refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Unauthorized - No refresh token found or token is invalid.
 *       '500':
 *         description: Internal Server Error.
 */
router.post("/refresh",refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the user
 *     description: Clears the refresh token cookie, effectively logging the user out on the server side. The client should also clear its access token.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       '500':
 *         description: Internal Server Error.
 */
router.post("/logout",logout);

export default router;