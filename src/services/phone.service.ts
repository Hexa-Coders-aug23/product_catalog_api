import ENV from 'dotenv';
import { QueryParams } from '../types/QueryParams';
import { PhoneDetails, Phone } from '../models/';
import { validateAndNormalize } from '../validation/validateAndNormalizeParams';

ENV.config();

export const getPhones = async (queryParams: QueryParams) => {
  const { offset, limit, sortByColumn, order } =
    await validateAndNormalize(queryParams);

  return Phone.findAndCountAll({
    offset: offset,
    limit: limit,
    order: [
      [sortByColumn, order],
      ['id', 'asc'],
    ],
  });
};

export const getById = async (id: string) => {
  return PhoneDetails.findByPk(id);
};

export const count = () => {
  return Phone.count();
};

export const getRecommendations = async (id: string) => {
  const phone = await getById(id);

  return phone;
};
