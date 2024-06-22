
import config from "../../config";
import { User } from "../user/user-model";
import jwt from "jsonwebtoken";

const logInUserIntoDB = async (email: string, password: string) => {
  const user = await User.findOne({ email, password });

  if (!user) {
    return null;
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
  };

  // Create token and send to the user
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_screet as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token: accessToken,
    data: jwtPayload,
  };
};

export const AuthServices = {
  logInUserIntoDB,
};
