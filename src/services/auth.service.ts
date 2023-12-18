import { User } from '../models';

const createUser = async (
  name: string,
  email: string,
  password: string,
  activationToken: string,
): Promise<User> => {
  return User.create({
    name,
    email,
    password,
    activationToken,
  });
};

export const authService = {
  createUser,
};
