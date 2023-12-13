/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import ENV from 'dotenv';
ENV.config();
import path from 'path';
import { phoneRouter } from './routes/phone.route';
import { connect } from './utils/initDb';

connect();

const app = express();

app.use(
  cors({
    origin: [process.env.ORIGIN_URL as string, 'http://localhost:3000'],
    credentials: true,
  }),
);

app.use(express.static(path.resolve(process.env.STATIC_PATH as string)));

app.use('/phones', express.json(), phoneRouter);

app.listen(3005, () =>
  console.log('Server is running on https://localhost:3005'),
);
