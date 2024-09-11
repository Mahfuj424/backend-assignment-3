import { generateRandomId } from "../../utils/generateId";
import { initiatePayment } from "../payment/payment_utils";
import { Room } from "../room/room-model";
import { Slot } from "../slots/slot-model";
import { User } from "../user/user-model";
import { TBooking } from "./booking-interface";
import { Booking } from "./booking-model";

export const bookingRoomFromDB = async (payload: TBooking) => {
  const { room, slots, user, date } = payload;

  // Fetch and populate room details
  const roomDetails = await Room.findById(room);
  if (!roomDetails) {
    throw new Error("Room not found");
  }

  // Fetch slot details
  const slotDetails = await Slot.find({ _id: { $in: slots } });
  if (slotDetails.length !== slots.length) {
    throw new Error("Some slots not found");
  }

  // Fetch and populate user details
  const userDetails = await User.findById(user);
  if (!userDetails) {
    throw new Error("User not found");
  }

  // Calculate total amount based on room price per slot
  const totalAmount = slotDetails.length * roomDetails.pricePerSlot;

  // Mark slots as booked

  const transaction_id = generateRandomId();
  // Create new booking
  const booking = new Booking({
    transaction_id,
    room,
    slots,
    user,
    date,
    totalAmount,
    isConfirmed: "pending",
    isDeleted: false,
  });

  await booking.save();

  // Construct payment data using populated user details
  const paymentData = {
    transactionId: transaction_id,
    totalAmount: totalAmount.toString(),
    customerName: userDetails.name,
    customerEmail: userDetails.email,
    customerAddress: userDetails.address,
    customerPhone: userDetails.phone,
  };

  // Initiate payment

  const paymentSession = await initiatePayment(paymentData);

  // Populate and return booking data
  // const populatedBooking = await Booking.findById(booking._id)
  //   .populate("room")
  //   .populate("slots")
  //   .populate("user"); // Populating the user details in the booking

  return paymentSession;
};

// get all booking
const getAllBookingFromDB = async () => {
  const result = await Booking.find({isDeleted:false})
    .populate("room")
    .populate("slots")
    .populate("user");
  return result;
};

// get booking for user
const getMyBookingFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId, isDeleted: false })
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

  // Check if isConfirmed is 'confirmed'
  if (
    result?.isConfirmed === "confirmed" &&
    result.slots &&
    Array.isArray(result.slots)
  ) {
    // For each slot ID in the bookingData.slots array
    result.slots.forEach(async (slotId) => {
      // Find the slot by its ID
      const slot = await Slot.findById(slotId);

      if (slot) {
        // Set a timer to update isBooked to false after 1 hour
        setTimeout(async () => {
          await Slot.findByIdAndUpdate(slotId, { isBooked: false });
          console.log(
            `Slot ${slotId} has been updated to isBooked: false after 1 hour.`
          );
        }, 3600 * 1000); // 1 hour in milliseconds
      }
    });
  }

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
