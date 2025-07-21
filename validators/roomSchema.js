import { z } from "zod";

export const roomSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});
