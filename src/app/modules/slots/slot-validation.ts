import { z } from "zod";

const createSlotSchema = z.object({
  body: z.object({
    room: z.string().min(1, { message: "Room ID is required" }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format, expected YYYY-MM-DD",
    }),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: "Invalid time format, expected HH:MM",
    }),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: "Invalid time format, expected HH:MM",
    }),
    isDeleted: z.boolean().default(false),
  }),
});

const updateSlotSchema = z.object({
  body: z
    .object({
      room: z.string().min(1, { message: "Room ID is required" }),
      date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: "Invalid date format, expected YYYY-MM-DD",
        })
        .optional(),
      startTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/, {
          message: "Invalid time format, expected HH:MM",
        })
        .optional(),
      endTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/, {
          message: "Invalid time format, expected HH:MM",
        })
        .optional(),
      isDeleted: z.boolean().optional(),
    })
    .refine((data) => data.date || data.startTime || data.endTime, {
      message:
        "At least one of date, startTime, or endTime must be provided for update",
    }),
});

export const slotValidations = {
  createSlotSchema,
  updateSlotSchema,
};
