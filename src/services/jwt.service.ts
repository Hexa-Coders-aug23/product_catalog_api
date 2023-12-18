import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/User';

const secretKey = process.env.JWT_KEY as string;

const sign = (user: Pick<IUser, 'id' | 'email'>) => {
  const token = jwt.sign(user, secretKey);

  return token;
};

const verify = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return null;
  }
};

export const jwtService = {
  sign,
  verify,
};
