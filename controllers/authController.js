import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { registerSchema, editUserSchema } from "../validators/userSchema.js";

const prisma = new PrismaClient();


export const register = async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const { name, email, password, role } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  const token = generateToken(user);
  res.status(201).json({ token });
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);
  return res.status(200).json({
    message: "Logged in successfully",
    token,
  });
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    message: "Current logged-in user",
    user: req.user,
  });
};


export const editUser = async (req, res) => {
  const { id } = req.params;
  const parsed = editUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const data = { ...parsed.data };

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  try {
    const updated = await prisma.user.update({
      where: { id },
      data,
    });
    return res.status(200).json({ message: "User updated", user: updated });
  } catch (err) {
    return res.status(500).json({ message: "Update failed", error: err.message });
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Invalid ID" });

  try {
    await prisma.user.delete({ where: { id } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "User deletion failed", error: err.message });
  }
};
