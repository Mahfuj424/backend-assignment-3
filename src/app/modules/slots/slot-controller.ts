/* eslint-disable @typescript-eslint/no-unused-vars */
import { SlotServices } from "./slot-service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

/* eslint-disable @typescript-eslint/no-explicit-any */
const createSlots = catchAsync(async (req, res, next) => {
  const body = req.body;

  const result = await SlotServices.createSlotsIntoDB(body);

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
    message: 'Slots created successfully',
    data: result,
  });
})

const getAvailableSlots = catchAsync(async (req, res, next) => {
  const { date, roomId } = req.query;
  const result = await SlotServices.getAvailableSlotsIntoDB(
    date as string,
    roomId as string
  );

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
    message: 'Available slots retrieved successfully',
    data: result,
  });
})

export const SlotControllers = {
  createSlots,
  getAvailableSlots,
};
