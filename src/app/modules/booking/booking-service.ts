import { Room } from "../room/room-model";
import { Slot } from "../slots/slot-model";
import { TBooking } from "./booking-interface";
import { Booking } from "./booking-model";

// create a room booking
export const bookingRoomFromDB = async (payload: TBooking) => {
  const { room, slots, user, date } = payload;

  
  const roomDetails = await Room.findById(room);
  if (!roomDetails) {
    throw new Error("Room not found");
  }

  
  const slotDetails = await Slot.find({ _id: { $in: slots } });
  if (slotDetails.length !== slots.length) {
    throw new Error("Some slots not found");
  }

  
  const totalAmount = slotDetails.length * roomDetails.pricePerSlot;

  
  for (const slot of slotDetails) {
    slot.isBooked = true;
    await slot.save();
  }

  
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


// get all booking
const getAllBookingFromDB = async () => {
  const result = await Booking.find()
    .populate("room")
    .populate("slots")
    .populate("user");
  return result;
};


// get booking for user
const getMyBookingFromDB = async (userId:string) => {
  const result = await Booking.find({user:userId, isDeleted:false})
    .populate("room")
    .populate("slots")
    .populate("user");
  return result;
};


// update a booking 
const updateBookingRoomFromDB = async (
  id: string,
  payload: Partial<TBooking>
) => {
  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};


// soft delete Booking
const deleteRoomFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const BookingServices = {
  bookingRoomFromDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
  updateBookingRoomFromDB,
  deleteRoomFromDB,
};
