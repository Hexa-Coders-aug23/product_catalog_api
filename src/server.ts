/* eslint-disable no-console */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ENV from 'dotenv';
ENV.config();
import path from 'path';
import { phoneRouter, tabletRouter, accessoryRouter } from './routes';
import { connect } from './utils/initDb';
import { authRouter } from './routes/auth.route';
import { userRouter } from './routes/user.route';

connect();

const app = express();

app.use(
  cors({
    origin: [process.env.ORIGIN_URL as string, 'http://localhost:3000'],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.static(path.resolve(process.env.STATIC_PATH as string)));

app.use('/', express.json(), authRouter);

app.use('/users', express.json(), userRouter);

app.use('/phones', express.json(), phoneRouter);

app.use('/tablets', express.json(), tabletRouter);

app.use('/accessories', express.json(), accessoryRouter);

app.listen(3005, () =>
  console.log('Server is running on https://localhost:3005'),
);
