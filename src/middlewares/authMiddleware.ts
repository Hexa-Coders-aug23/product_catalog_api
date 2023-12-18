'use strict';
import { Request as Req, Response as Res, NextFunction } from 'express';
import { jwtService } from '../services/jwt.service';

export const authMiddleware = (req: Req, res: Res, next: NextFunction) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    res.sendStatus(401);

    return;
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    res.sendStatus(401);

    return;
  }

  const userData = jwtService.verify(token);

  if (!userData) {
    res.sendStatus(401);

    return;
  }

  next();
};
