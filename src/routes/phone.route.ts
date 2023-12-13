import express from 'express';
import * as phoneController from '../controllers/phone.controller';

export const phoneRouter = express.Router();

phoneRouter.get('/', phoneController.getAll);

phoneRouter.get('/:id', phoneController.getOne);
