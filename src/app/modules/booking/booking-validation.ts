import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    room: z.string().nonempty("Room ID is required"),
    slots: z
      .array(z.string().nonempty("Slot ID is required"))
      .nonempty("At least one slot ID is required"),
    user: z.string().nonempty("User ID is required"),
    date: z.string().nonempty("Date is required"),
    totalAmount: z.number().optional(),
    isConfirmed: z.union([z.boolean(), z.string()]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const BookingValidations = {
  bookingValidationSchema,
};
