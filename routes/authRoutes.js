import express from "express";
import { register, login, getCurrentUser, editUser, deleteUser } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);
router.put("/:id", protect, authorizeRoles("ADMIN"), editUser);
router.delete("/:id", protect, authorizeRoles("ADMIN"), deleteUser);



export default router;