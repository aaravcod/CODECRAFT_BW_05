import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Room booking operations
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Book a room
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [roomId, checkIn, checkOut]
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: The ID of the room to book
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-25T14:00:00Z"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-27T11:00:00Z"
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid input or room not available
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, createBooking);

export default router;
