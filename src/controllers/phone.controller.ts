import { Request, Response } from 'express';
import * as phoneService from '../services/phone.service';
import { notFoundResponse } from '../helpers/notFoundResponse';

export const get = async (req: Request, res: Response) => {
  try {
    const phones = await phoneService.getPhones(req.query);

    res.send(phones);
  } catch (err) {
    res.send(err);
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const phone = await phoneService.getById(id);

  if (!phone) {
    return notFoundResponse(res);
  }

  res.send(phone);
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    res.send(await phoneService.getRecommendations(req.params.id));
  } catch (err) {
    res.send(err);
  }
};
