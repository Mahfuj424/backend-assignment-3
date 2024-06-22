import { z } from "zod";

const createSlotSchema = z.object({
  body: z.object({
    room: z.string().min(1, { message: "Room ID is required" }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format, expected YYYY-MM-DD",
    }),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, {
        message: "Invalid time format, expected HH:MM",
      }),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, {
        message: "Invalid time format, expected HH:MM",
      }),
  }),
});

export const slotValidaitons = {
  createSlotSchema,
};
