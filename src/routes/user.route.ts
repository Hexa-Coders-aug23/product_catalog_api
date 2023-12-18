import express from 'express';
import { authController } from '../controllers/auth.controller';

export const userRouter = express.Router();

userRouter.get('/registration', authController.register);
