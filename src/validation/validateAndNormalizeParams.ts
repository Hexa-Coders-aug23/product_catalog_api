'use strict';

import * as phoneService from '../services/phone.service';
import { QueryParams } from '../types/QueryParams';
import { SortBy } from '../types/SortBy';

const availablePerPage = [4, 8, 16];

export const validateAndNormalize = async ({
  page,
  perPage,
  sortBy,
}: QueryParams) => {
  const phonesCount = await phoneService.count();
  let offset = !isNaN(+page) && +page > 0 ? +page - 1 : 0;
  let limit = !isNaN(+perPage) ? +perPage : 16;
  const sort = Object.values(SortBy).includes(sortBy) ? sortBy : SortBy.Newest;
  const order =
    sort === SortBy.Alphabetically || sort === SortBy.Cheapest ? 'asc' : 'desc';

  if (!availablePerPage.includes(+perPage)) {
    limit = 16;
  }

  if (perPage === 'all') {
    limit = phonesCount;
  }

  const maxPage = phonesCount / +limit - 1;

  if (offset > maxPage) {
    offset = 0;
  }

  offset = offset * limit;

  let sortByColumn = 'year';

  if (sort === SortBy.Cheapest) {
    sortByColumn = 'price';
  }

  if (sort === SortBy.Alphabetically) {
    sortByColumn = 'name';
  }

  console.log({ sortByColumn, order });

  return {
    offset,
    limit,
    sortByColumn,
    order,
  };
};
