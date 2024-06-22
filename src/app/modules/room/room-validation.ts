import { z } from "zod";

export const createRoomValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  roomNo: z
    .number()
    .nonnegative({ message: "Room number must be a non-negative integer" }),
  floorNo: z
    .number()
    .nonnegative({ message: "Floor number must be a non-negative integer" }),
  capacity: z
    .number()
    .positive({ message: "Capacity must be a positive integer" }),
  pricePerSlot: z
    .number()
    .positive({ message: "Price per slot must be a positive number" }),
  amenities: z
    .array(z.string().nonempty({ message: "Amenity cannot be empty" }))
    .nonempty({ message: "Amenities are required" }),
  isDeleted: z.boolean().default(false),
});

const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().optional(),
    floorNo: z.number().optional(),
    capacity: z.number().optional(),
    pricePerSlot: z.number().optional(),
    amenities: z.array(z.string()).optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const RoomValidations = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
