import express from "express";
import { createRoom, updateRoom, deleteRoom, searchAvailableRooms } from "../controllers/roomController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management and availability search
 */

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room listing (Owner only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [title, description, price, checkIn, checkOut]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Room created successfully
 *       401:
 *         description: Unauthorized or invalid token
 *       403:
 *         description: Insufficient permissions
 */
router.post("/", protect, authorizeRoles("OWNER"), createRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Update a room listing (Owner only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the room owner
 *       404:
 *         description: Room not found
 */
router.put("/:id", protect, authorizeRoles("OWNER"), updateRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Delete a room listing (Owner only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the room owner
 *       404:
 *         description: Room not found
 */
router.delete("/:id", protect, authorizeRoles("OWNER"), deleteRoom);

/**
 * @swagger
 * /rooms/search:
 *   get:
 *     summary: Search for available rooms by check-in and check-out dates
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: checkIn
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Desired check-in date
 *       - in: query
 *         name: checkOut
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Desired check-out date
 *     responses:
 *       200:
 *         description: List of available rooms
 *       400:
 *         description: Missing or invalid query parameters
 */
router.get("/search", searchAvailableRooms);

export default router;
