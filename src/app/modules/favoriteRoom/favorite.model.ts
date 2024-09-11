import { model, Schema } from "mongoose";
import { TFavorite } from "./favorite-interface";

const favoriteRoomSchema = new Schema<TFavorite>(
  {
    name: { type: String, required: true },
    roomNo: { type: Number, required: true, unique: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    images: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Favorite = model<TFavorite>("Favorite", favoriteRoomSchema);