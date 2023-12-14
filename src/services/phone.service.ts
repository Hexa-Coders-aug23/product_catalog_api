import ENV from 'dotenv';
ENV.config();
import { QueryParams } from '../types/QueryParams';
import { PhoneDetails, Phone } from '../models/';
import { validateAndNormalize } from '../validation/validateAndNormalizeParams';
import { literal, Op } from 'sequelize';

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

export const getRecommendations = async (phoneId: string) => {
  const phone = (await getById(phoneId)) as PhoneDetails;

  const { id } = phone;

  return Phone.findAll({
    where: {
      phoneId: {
        [Op.not]: id,
      },
    },
    order: literal('RANDOM()'),
    limit: 12,
  });
};

export const getDiscounts = () => {
  return Phone.findAll({
    where: {
      price: {
        [Op.ne]: literal('"fullPrice"'),
      },
    },
    order: [[literal('ABS("fullPrice" - "price")'), 'desc']],
    limit: 12,
  });
};

export const getNew = () => {
  return Phone.findAll({
    order: [['fullPrice', 'desc']],
    limit: 12,
  });
};
