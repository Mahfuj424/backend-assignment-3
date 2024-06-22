import { User } from "../user/user-model";

const logInUserIntoDB = async (email: string, password: string) => {
  const user = await User.findOne({ email, password });
  if (!user) {
    return false;
  }
  return user;
};

export const AuthServices = {
  logInUserIntoDB,
};
