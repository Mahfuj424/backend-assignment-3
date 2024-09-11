import { model, Schema } from "mongoose";
import { TBooking } from "./booking-interface";

const bookingSchema = new Schema<TBooking>({
  transaction_id: {
    type: String,
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  slots: [
    {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: false,
  },
  isConfirmed: {
    type: Schema.Types.Mixed,
    default: false,
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: false,
  },
});

export const Booking = model<TBooking>("Booking", bookingSchema);
