/* eslint-disable @typescript-eslint/no-var-requires */
const ENV = require('dotenv');

ENV.config();

const setting = {
  url: process.env.DB_URL,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      require: true,
    },
  },
};

module.exports = {
  development: { ...setting },
  test: { ...setting },
  production: { ...setting },
};
