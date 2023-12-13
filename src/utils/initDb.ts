import { Sequelize } from 'sequelize-typescript';
import { Phone, PhoneDetails } from '../models';
import ENV from 'dotenv';

ENV.config();

const URI = process.env.DB_URL as string;

const sequelize = new Sequelize(URI, {
  models: [Phone, PhoneDetails],
  dialectOptions: { ssl: true },
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
