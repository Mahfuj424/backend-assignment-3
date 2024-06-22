import { Request, Response } from "express";
import { AuthServices } from "./auth-service";

const logInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await AuthServices.logInUserIntoDB(email, password);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User logedIn successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to logedIn user",
    });
  }
};

export const AuthControllers = {
  logInUser,
};
