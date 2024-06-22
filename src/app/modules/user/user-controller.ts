import { Request, Response } from "express";
import { z } from "zod";
import userValidationSchema from "./user-validation";
import { UserServices } from "./user-service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodValidateUser = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodValidateUser);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to create user",
      });
    }
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await UserServices.logInUserIntoDB(email, password);
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

export const UserControllers = {
  createUser,
  loginUser
};
