import { Response } from 'express';
import { User } from '../models';
import { userService } from '../services/user.service';
import { jwtService } from '../services/jwt.service';
import { tokenService } from '../services/token.service';

export const generateTokens = async (res: Response, user: User) => {
  try {
    const userData = userService.normalize(user);
    const accessToken = jwtService.sign(userData);
    const refreshToken = jwtService.signRefresh(userData);

    await tokenService.save(userData.id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.send({
      user: userData,
      accessToken,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
