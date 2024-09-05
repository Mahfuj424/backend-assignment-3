import { z } from "zod";

export const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    roomNo: z
      .number()
      .int()
      .nonnegative({ message: "Room number must be a non-negative integer" }),
    floorNo: z
      .number()
      .int()
      .nonnegative({ message: "Floor number must be a non-negative integer" }),
    capacity: z
      .number()
      .int()
      .positive({ message: "Capacity must be a positive integer" }),
    pricePerSlot: z
      .number()
      .positive({ message: "Price per slot must be a positive number" }),
    amenities: z
      .array(z.string().nonempty({ message: "Amenity cannot be empty" }))
      .nonempty({ message: "At least one amenity is required" }),
    images: z
      .array(z.string().nonempty({ message: "Image URL cannot be empty" }))
      .nonempty({ message: "At least one image is required" }),
    isDeleted: z.boolean().default(false),
  }),
});

export const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().int().nonnegative().optional(),
    floorNo: z.number().int().nonnegative().optional(),
    capacity: z.number().int().positive().optional(),
    pricePerSlot: z.number().positive().optional(),
    amenities: z.array(z.string().nonempty()).optional(),
    images: z.array(z.string().nonempty()).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const RoomValidations = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
