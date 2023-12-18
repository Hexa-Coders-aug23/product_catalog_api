/* eslint-disable no-console */
import { initDB } from './initDb';
import { Token } from '../models/Token';
// import { User } from '../models';

export const sync = async () => {
  try {
    initDB();
    // await User.sync({ force: true });
    await Token.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
};

sync();
