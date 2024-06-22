/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { BookingServices } from "./booking-service";

const bookingRoom = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const result = await BookingServices.bookingRoomFromDB(body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "room booked successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingServices.getAllBookingFromDB();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "room booked successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const getMyBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingServices.getMyBookingFromDB();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "room booked successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const BookingControllers = {
  bookingRoom,
  getAllBooking,
  getMyBooking,
};
