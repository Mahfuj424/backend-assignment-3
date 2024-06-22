import { Room } from "../room/room-model";
import { Slot } from "../slots/slot-model";
import { TBooking } from "./booking-interface";
import { Booking } from "./booking-model";

export const bookingRoomFromDB = async (payload: TBooking) => {
  const { room, slots, user, date } = payload;

  // Fetch room details to calculate the price
  const roomDetails = await Room.findById(room);
  if (!roomDetails) {
    throw new Error("Room not found");
  }

  // Fetch the selected slots to mark them as booked
  const slotDetails = await Slot.find({ _id: { $in: slots } });
  if (slotDetails.length !== slots.length) {
    throw new Error("Some slots not found");
  }

  // Calculate the total amount
  const totalAmount = slotDetails.length * roomDetails.pricePerSlot;

  // Mark slots as booked
  for (const slot of slotDetails) {
    slot.isBooked = true;
    await slot.save();
  }

  // Create the booking
  const booking = new Booking({
    room,
    slots,
    user,
    date,
    totalAmount,
    isConfirmed: false,
    isDeleted: false,
  });

  await booking.save();

  // Populate the response data
  const populatedBooking = await Booking.findById(booking._id)
    .populate("room")
    .populate("slots")
    .populate("user");

  return populatedBooking;
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find()
    .populate("room")
    .populate("slots")
    .populate("user");
  return result;
};

const getMyBookingFromDB = async () => {
  const result = await Booking.find()
    .populate("room")
    .populate("slots")
    .populate("user");
  return result;
};

export const BookingServices = {
  bookingRoomFromDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
};
