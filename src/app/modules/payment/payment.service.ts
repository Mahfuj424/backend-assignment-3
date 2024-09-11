/* eslint-disable @typescript-eslint/no-unused-vars */
import { Booking } from "../booking/booking-model"; 
import { Slot } from "../slots/slot-model";
import { verifyPayment } from "./payment_utils";

const confirmationService = async (transaction_id: string) => {
  // Verify the payment first
  const verifyResponse = await verifyPayment(transaction_id);

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    // Find the booking data by the transaction_id
    const bookingData = await Booking.findOne({ transaction_id });

    if (bookingData && bookingData.slots && Array.isArray(bookingData.slots)) {
        await Slot.updateMany(
        { _id: { $in: bookingData.slots } },
        { $set: { isBooked: true } }
      );
    } else {
      throw new Error("No booking data or slots found for this transaction.");
    }
  }else{
    throw new Error("Payment failed!");
  }
};

export const paymentServices = {
  confirmationService,
};
