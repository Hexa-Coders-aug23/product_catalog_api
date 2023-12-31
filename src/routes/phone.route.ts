import express from 'express';
import * as phoneController from '../controllers/phone.controller';

export const phoneRouter = express.Router();

phoneRouter.get('/', phoneController.get);

phoneRouter.get('/length', phoneController.getLength);

phoneRouter.get('/discount', phoneController.getDiscountedPhones);

phoneRouter.get('/new', phoneController.getNewPhones);

phoneRouter.get('/:id', phoneController.getOne);

phoneRouter.get('/:id/recommended', phoneController.getRecommendations);

phoneRouter.get('/many/:ids', phoneController.getMany);
