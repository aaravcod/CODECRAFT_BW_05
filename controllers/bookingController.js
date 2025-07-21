import { PrismaClient } from "@prisma/client";
import { bookingSchema } from "../validators/bookingSchema.js";

const prisma = new PrismaClient();

export const createBooking = async (req, res) => {
  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const { roomId, checkIn, checkOut } = parsed.data;

  try {

    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }


    const overlapping = await prisma.booking.findFirst({
      where: {
        roomId,
        AND: [
          { checkIn: { lte: checkOut } },
          { checkOut: { gte: checkIn } },
        ],
      },
    });

    if (overlapping) {
      return res.status(409).json({ message: "Room already booked for selected dates" });
    }


    const booking = await prisma.booking.create({
      data: {
        roomId,
        userId: req.user.id,
        checkIn,
        checkOut,
      },
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};
