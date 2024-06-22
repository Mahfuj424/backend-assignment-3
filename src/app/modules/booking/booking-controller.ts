/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookingServices } from "./booking-service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const bookingRoom = catchAsync(async (req, res, next) => {
  const body = req.body;

  const result = await BookingServices.bookingRoomFromDB(body);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res, next) => {
  
  const result = await BookingServices.getAllBookingFromDB();

  if (!result || result.length < 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const getMyBooking = catchAsync(async (req, res, next) => {
  const userId = req.user._id
  const result = await BookingServices.getMyBookingFromDB(userId);

  if (!result || result.length < 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

const updateBookingRoom = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  const result = await BookingServices.updateBookingRoomFromDB(id, body);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});

const deleteRoom = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await BookingServices.deleteRoomFromDB(id);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking deleted successfully",
    data: result,
  });
});

export const BookingControllers = {
  bookingRoom,
  getAllBooking,
  getMyBooking,
  updateBookingRoom,
  deleteRoom,
};
