/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthServices } from "./auth-service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const logInUser = catchAsync(async (req, res, next) => {
  const body = req.body;

  const { email, password } = body;

  const result = await AuthServices.logInUserIntoDB(email, password);

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
    message: "User logged in successfully",
    token: result?.token,
    data:result?.data
  });
});

export const AuthControllers = {
  logInUser,
};
