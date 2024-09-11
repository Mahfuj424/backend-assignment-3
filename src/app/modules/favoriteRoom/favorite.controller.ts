/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { FavoriteRoomServices } from "./favorite.service";

const addFavoriteRoom = catchAsync(async (req, res, next) => {
  const roomData = req.body;

  const result = await FavoriteRoomServices.addFavoriteRoomIntoDB(roomData);

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

export const FavoriteRoomControllers = {
  addFavoriteRoom,
};
