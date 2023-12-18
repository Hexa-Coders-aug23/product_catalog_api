import { Request, Response } from 'express';

const register = (req: Request, res: Response) => {
  res.send('Hello');
};

export const authController = {
  register,
};
