import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/User';

const secretKey = process.env.JWT_KEY as string;
const refreshKey = process.env.JWT_REFRESH_KEY as string;

const sign = (user: Pick<IUser, 'id' | 'email'>) => {
  const token = jwt.sign(user, secretKey, {
    expiresIn: '20m',
  });

  return token;
};

const verify = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return null;
  }
};

const signRefresh = (user: Pick<IUser, 'id' | 'email'>) => {
  const token = jwt.sign(user, refreshKey);

  return token;
};

const verifyRefresh = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return null;
  }
};

export const jwtService = {
  sign,
  verify,
  signRefresh,
  verifyRefresh,
};
