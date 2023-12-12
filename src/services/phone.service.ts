import fs from 'fs/promises';
import path from 'path';
import ENV from 'dotenv';
import { Phone } from '../types/Phone';
import { PhoneDetails } from '../types/PhoneDetails';

ENV.config();

const phonesPath = path.join(__dirname, '../../store', 'phones.json');

export const getAll = async() => {
  const data = await fs.readFile(phonesPath, 'utf-8');

  const phones = JSON.parse(data);

  const phonesWithImages = phones.map((phone: Phone) => ({
    ...phone,
    image: `${process.env.SERVER_URL}/${phone.image}`,
  }));

  return phonesWithImages;
};

export const getById = async(id: string) => {
  const phonePath = path.join(__dirname, '../../store/phones', `${id}.json`);
  const data = await fs.readFile(phonePath, 'utf-8');

  const phone: PhoneDetails = JSON.parse(data);

  const phoneWithImages = {
    ...phone,
    images: phone.images.map((image) => `${process.env.SERVER_URL}/${image}`),
  };

  return phoneWithImages;
};
