import { Request, Response } from 'express';
import { User } from '../models';
import { emailService } from '../services/email.service';
import { v4 as uuidv4 } from 'uuid';
import { userService } from '../services/user.service';
import { jwtService } from '../services/jwt.service';

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const activationToken = uuidv4();
  const newUser = await User.create({ email, password, activationToken });
  await emailService.sendActivationEmail(email, activationToken);

  res.send(newUser);
};

const activate = async (req: Request, res: Response) => {
  const { activationToken } = req.params;
  const user = await User.findOne({ where: { activationToken } });

  if (!user) {
    res.sendStatus(404);
    return;
  }

  user.activationToken = '';
  user.save();

  res.send(user);
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);

  if (!user || user.password !== password) {
    res.send(401);

    return;
  }

  const normalizedUser = userService.normalize(user);
  const accessToken = jwtService.sign(normalizedUser);

  res.send({
    user: normalizedUser,
    accessToken,
  });
};

export const authController = {
  register,
  activate,
  login,
};
