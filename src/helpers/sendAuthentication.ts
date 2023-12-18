import { Response } from 'express';
import { User } from '../models';
import { userService } from '../services/user.service';
import { jwtService } from '../services/jwt.service';

export const sendAuthentication = async (res: Response, user: User) => {
  try {
    const userData = userService.normalize(user);
    const accessToken = jwtService.sign(userData);

    res.send({
      user: userData,
      accessToken,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
