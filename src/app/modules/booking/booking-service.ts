/* eslint-disable @typescript-eslint/no-explicit-any */
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
  console.log(paymentSession);

  // Populate and return booking data
  // const populatedBooking = await Booking.findById(booking._id)
  //   .populate("room")
  //   .populate("slots")
  //   .populate("user"); // Populating the user details in the booking

  return paymentSession;
};

// get all booking
const getAllBookingFromDB = async () => {
  const result = await Booking.find({ isDeleted: false })
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
const updateBookingRoomFromDB = async (id: string, payload: any) => {
  // Find the booking first without updating it
  const booking = await Booking.findById(id);

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Check if slots are available and valid
  if (booking.slots && Array.isArray(booking.slots)) {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const currentDate = new Date(); // Get the current date

    let shouldDeleteBooking = false;

    for (const slotId of booking.slots) {
      const slot = await Slot.findById(slotId);

      if (slot) {
        // Extract the date and time from the slot
        const slotDate = new Date(slot.date); // Assuming the date is in the 'date' field
        const slotStartTime = new Date(
          `1970-01-01T${slot.startTime}:00`
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        // If currentDate is the same as the slotDate
        if (
          currentDate.toDateString() === slotDate.toDateString() &&
          currentTime > slotStartTime
        ) {
          // If currentTime > slotStartTime, mark for deletion
          shouldDeleteBooking = true;
          await Slot.findByIdAndUpdate(slotId, { isBooked: false });
        } else if (currentDate.toDateString() === slotDate.toDateString()) {
          // Start countdown only when the current date matches the slot date
          const slotStartTimeFull = new Date(
            `${slotDate.toDateString()} ${slot.startTime}`
          );
          const timeDifference =
            slotStartTimeFull.getTime() - currentDate.getTime();

          if (timeDifference > 0) {
            // Slot startTime hasn't passed, set a timer for 160 seconds
            setTimeout(async () => {
              await Slot.findByIdAndUpdate(slotId, { isBooked: false });
              await Booking.findByIdAndUpdate(id, {
                isConfirmed: "Time-Expired!",
              });
              console.log(
                `Slot ${slotId} has been updated to isBooked: false after the start time passed.`
              );
            }, timeDifference + 160 * 1000); // Add 160 seconds or your desired time
          }
        }
      }
    }

    if (shouldDeleteBooking) {
      // Delete the booking if the slot's start time has passed
      await Booking.findByIdAndDelete(id, { isDeleted: true });
      console.log(`Slot startTime has passed, booking deleted.`);

      // Return null to indicate the booking was deleted
      return { message: "Slot start time expired. Booking deleted." };
    }
  }

  // If the slot's start time has not passed, update the booking as usual
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
