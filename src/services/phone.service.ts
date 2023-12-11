import fs from 'fs/promises';
import path from 'path';
import ENV from 'dotenv';
import { Phone } from '../types/Phone';

ENV.config();

const phonePath = path.join(__dirname, '../../store', 'phones.json');

export const getAll = async() => {
  const data = await fs.readFile(phonePath, 'utf-8');

  const phones = JSON.parse(data);

  const phonesWithImages = phones.map((phone: Phone) => ({
    ...phone,
    image: `${process.env.SERVER_URL}/${phone.image}`,
  }));

  return phonesWithImages;
};
