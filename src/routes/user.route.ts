import express from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

export const userRouter = express.Router();

userRouter.get('/', authMiddleware, userController.get);
