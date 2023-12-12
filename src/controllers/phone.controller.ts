import { Request, Response } from 'express';
import * as phoneService from '../services/phone.service';
import { notFoundResponse } from '../helpers/notFoundResponse';

export const get = async(req: Request, res: Response) => {
  res.send(await phoneService.getAll());
};

export const getOne = async(req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const phone = await phoneService.getById(id);

    res.send(phone);
  } catch (_) {
    return notFoundResponse(res);
  }
};
