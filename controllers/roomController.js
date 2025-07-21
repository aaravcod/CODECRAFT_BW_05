import { PrismaClient } from "@prisma/client";
import { roomSchema } from "../validators/roomSchema.js";

const prisma = new PrismaClient();


export const createRoom = async (req, res) => {
  const parsed = roomSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const { title, description, price, checkIn, checkOut } = parsed.data;

  try {
    const room = await prisma.room.create({
      data: {
        title,
        description,
        price,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        userId: req.user.id,
      },
    });

    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: "Room creation failed", error: err.message });
  }
};


export const updateRoom = async (req, res) => {
  const { id } = req.params;

  const parsed = roomSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  try {
    const room = await prisma.room.findUnique({ where: { id } });
    if (!room) return res.status(404).json({ message: "Room not found" });
    if (room.userId !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    const updated = await prisma.room.update({
      where: { id },
      data: {
        ...parsed.data,
        ...(parsed.data.checkIn && { checkIn: new Date(parsed.data.checkIn) }),
        ...(parsed.data.checkOut && { checkOut: new Date(parsed.data.checkOut) }),
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Room update failed", error: err.message });
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await prisma.room.findUnique({ where: { id } });
    if (!room) return res.status(404).json({ message: "Room not found" });
    if (room.userId !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    await prisma.room.delete({ where: { id } });
    res.status(200).json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};

export const searchAvailableRooms = async (req, res) => {
  const { checkIn, checkOut } = req.query;

  if (!checkIn || !checkOut) {
    return res.status(400).json({ message: "checkIn and checkOut are required" });
  }

  try {
    const availableRooms = await prisma.room.findMany({
      where: {
        bookings: {
          none: {
            AND: [
              { checkIn: { lte: new Date(checkOut) } },
              { checkOut: { gte: new Date(checkIn) } },
            ],
          },
        },
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.status(200).json(availableRooms);
  } catch (err) {
    res.status(500).json({ message: "Error searching rooms", error: err.message });
  }
};
