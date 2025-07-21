import { z } from "zod";

export const bookingSchema = z.object({
  roomId: z.string().uuid({ message: "Invalid room ID" }),
  checkIn: z.coerce.date({ message: "Invalid check-in date" }),
  checkOut: z.coerce.date({ message: "Invalid check-out date" }),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "checkOut must be after checkIn",
  path: ["checkOut"],
});
