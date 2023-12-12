import { Response } from 'express';

export const notFoundResponse = (res: Response) => {
  return res.status(404).json({
    error: 'Phone not found',
  });
};
