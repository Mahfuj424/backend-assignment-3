/* eslint-disable @typescript-eslint/no-unused-vars */
import { RoomServices } from "./room-service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { TFilterOptions } from "./room-interface";

const createRoom = catchAsync(async (req, res, next) => {
  const roomData = req.body;

  const result = await RoomServices.createRoomIntoDB(roomData);

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
    message: "Room added successfully",
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const result = await RoomServices.getSingleRoomFromDB(id);

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
    message: "Room retrieved successfully",
    data: result,
  });
});

const getAllRoom = catchAsync(async (req, res, next) => {
  const filterOptions: TFilterOptions = {
    // Ensure that search is a string or default to an empty string
    search: typeof req.query.search === "string" ? req.query.search : "",

    // Convert capacity to number, or set it to undefined if not applicable
    capacity: req.query.capacity ? Number(req.query.capacity) : undefined,

    // Convert minPrice and maxPrice to number if they exist
    minPrice: req.query.minPrice
      ? parseFloat(req.query.minPrice as string)
      : undefined,
    maxPrice: req.query.maxPrice
      ? parseFloat(req.query.maxPrice as string)
      : undefined,

    // Ensure that sortBy is a string, default to 'Default'
    sortby: typeof req.query.sortBy === "string" ? req.query.sortBy : "Default",

    // Pagination: Ensure page and limit are numbers
    page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 8,
  };

  const result = await RoomServices.getAllRoomFromDB(filterOptions);

  if (!result) {
    throw new Error("Data not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully",
    data: result.data,
  });
});

const updateRoom = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await RoomServices.updateRoomFromDB(id, updatedData);

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
    message: "Room updated successfully",
    data: result,
  });
});

const deleteRoom = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await RoomServices.deleteRoomFromDB(id);

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
    message: "Room deleted successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getSingleRoom,
  getAllRoom,
  updateRoom,
  deleteRoom,
};
