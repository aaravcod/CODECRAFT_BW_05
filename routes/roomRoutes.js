import express from "express";
import { createRoom, updateRoom, deleteRoom } from "../controllers/roomController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("OWNER"), createRoom);
router.put("/:id", protect, authorizeRoles("OWNER"), updateRoom);
router.delete("/:id", protect, authorizeRoles("OWNER"), deleteRoom);
router.get("/search", searchAvailableRooms);


export default router;
