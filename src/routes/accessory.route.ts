import express from 'express';
import * as accessoryController from '../controllers/accessory.controller';

export const accessoryRouter = express.Router();

accessoryRouter.get('/', accessoryController.get);

accessoryRouter.get('/length', accessoryController.getLength);
