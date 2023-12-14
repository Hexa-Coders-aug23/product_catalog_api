import express from 'express';
import * as tabletController from '../controllers/tablet.controller';

export const tabletRouter = express.Router();

tabletRouter.get('/', tabletController.get);

tabletRouter.get('/length', tabletController.getLength);
