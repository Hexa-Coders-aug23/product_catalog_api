import { Request, Response } from 'express';
import * as accessoryService from '../services/accessory.service';

export const get = (req: Request, res: Response) => {
  res.send({ message: 'There will be accessories' });
};

export const getLength = (req: Request, res: Response) => {
  try {
    const count = accessoryService.count();

    res.send(count);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
