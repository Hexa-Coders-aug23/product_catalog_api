import { Request, Response } from 'express';
import * as phoneService from '../services/phone.service';
import { notFoundResponse } from '../helpers/notFoundResponse';

export const get = async (req: Request, res: Response) => {
  try {
    const phones = await phoneService.getPhones(req.query);

    res.send(phones);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const phone = await phoneService.getById(id);

    if (!phone) {
      return notFoundResponse(res);
    }

    res.send(phone);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    res.send(await phoneService.getRecommendations(req.params.id));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDiscountedPhones = async (req: Request, res: Response) => {
  try {
    res.send(await phoneService.getDiscounts());
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNewPhones = async (req: Request, res: Response) => {
  try {
    res.send(await phoneService.getNew());
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
