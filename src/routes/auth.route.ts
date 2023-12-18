import express from 'express';
import { authController } from '../controllers/auth.controller';

export const authRouter = express.Router();

authRouter.post('/registration', authController.register);
authRouter.get('/activation/:activationToken', authController.activate);
authRouter.post('/login', authController.login);
authRouter.get('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);
