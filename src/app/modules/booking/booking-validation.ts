import { z } from 'zod';

export const bookingSchema = z.object({
  room: z.string().nonempty("Room ID is required"),
  slots: z.array(z.string().nonempty("Slot ID is required")).nonempty("At least one slot ID is required"),
  user: z.string().nonempty("User ID is required"),
  date: z.string().nonempty("Date is required"),
  totalAmount: z.number().positive("Total amount must be a positive number"),
  isConfirmed: z.boolean().optional(),
  isDeleted: z.boolean().optional()
});