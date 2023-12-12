import fs from 'fs/promises';
import path from 'path';
import ENV from 'dotenv';
import { Phone } from '../types/Phone';
import { PhoneDetails } from '../types/PhoneDetails';
import { QueryParams } from '../types/QueryParams';
import { SortBy } from '../types/SortBy';

ENV.config();

const phonesPath = path.join(__dirname, '../../store', 'phones.json');

export const getPhones = async(queryParams: QueryParams) => {
  const sortBy: SortBy = queryParams.sortBy || SortBy.Newest;
  const itemsOnPage: number | string = queryParams.perPage || 16;
  const page: number = +queryParams.page || 1;

  const data = await fs.readFile(phonesPath, 'utf-8');

  const phones: Phone[] = JSON.parse(data);

  const phonesWithImages: Phone[] = phones.map((phone) => ({
    ...phone,
    image: `${process.env.SERVER_URL}/${phone.image}`,
  }));

  phonesWithImages.sort((phone1, phone2) => {
    switch (sortBy) {
      case SortBy.Newest:
        return phone2.year - phone1.year;
      case SortBy.Alphabetically:
        return phone1.name.localeCompare(phone2.name);
      case SortBy.Cheapest:
        return phone1.price - phone2.price;
      default:
        return 0;
    }
  });

  if (itemsOnPage === 'all') {
    return phonesWithImages;
  }

  return phonesWithImages.slice(
    +itemsOnPage * page - +itemsOnPage,
    +itemsOnPage * page,
  );
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
