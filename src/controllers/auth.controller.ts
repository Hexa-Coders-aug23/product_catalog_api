import { Request, Response } from 'express';
import { User } from '../models';
import { emailService } from '../services/email.service';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { userService } from '../services/user.service';
import { validateEmail, validatePassword } from '../validation/validateAuth';
import { sendAuthentication } from '../helpers/sendAuthentication';

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (!name) {
    res.status(400).send('Name is required');

    return;
  }

  if (errors.email) {
    res.status(400).send(errors.email);

    return;
  }

  if (errors.password) {
    res.status(400).send(errors.password);

    return;
  }

  try {
    const isEmailTaken = await userService.findByEmail(email);

    if (isEmailTaken) {
      return res.status(400).send('Email is already taken');
    }

    const activationToken = uuidv4();
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      hashedPass,
      activationToken,
    });
    await emailService.sendActivationEmail(email, activationToken);

    const responseData = userService.normalize(newUser);

    res.status(201).send(responseData);
  } catch (_) {
    res.sendStatus(500);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const { activationToken } = req.params;
    const user = await User.findOne({
      where: {
        activationToken,
      },
    });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    user.activationToken = '';
    user.save();

    await sendAuthentication(res, user);
  } catch (_) {
    res.sendStatus(500);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);

    if (!user) {
      res.status(401).send('User not found');

      return;
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send('Wrong password');

      return;
    }

    await sendAuthentication(res, user);
  } catch (_) {
    res.sendStatus(500);
  }
};

export const authController = {
  register,
  activate,
  login,
};
