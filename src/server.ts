/* eslint-disable no-console */
import express from 'express';

const app = express();

app.listen(3005, () =>
  console.log('Server is running on https://localhost:3005'));
