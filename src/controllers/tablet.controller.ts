import { Request, Response } from 'express';
import * as tabletService from '../services/tablet.service';

export const get = (req: Request, res: Response) => {
  res.send({ message: 'There will be tablets' });
};

export const getLength = (req: Request, res: Response) => {
  try {
    const count = tabletService.count();

    res.send(count);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
