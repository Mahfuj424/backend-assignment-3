import { TUser } from "./user-interface";
import { User } from "./user-model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const logInUserIntoDB = async (email: string, password: string) => {
  const user = await User.findOne({ email, password });
  if (!user) {
    throw new Error("invalid email and password");
  } else {
    return user;
  }
};

export const UserServices = {
  createUserIntoDB,
  logInUserIntoDB
};
