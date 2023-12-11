import { Request, Response } from 'express';
import * as phoneService from '../services/phone.service';

export const get = async(req: Request, res: Response) => {
  res.send(await phoneService.getAll());
};
