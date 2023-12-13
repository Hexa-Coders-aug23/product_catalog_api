/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const serverBaseUrl = process.env.SERVER_URL;

    const normalizeImage = imagePath => {
      return `${serverBaseUrl}/${imagePath}`;
    };
    const filePath = path.join(__dirname, '../store/phones.json');
    const data = await fs.readFile(filePath, 'utf8');

    const phones = JSON.parse(data);

    const phonesWithImages = phones.map(phone => ({
      ...phone,
      id: +phone.id,
      image: normalizeImage(phone.image),
    }));

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('phones', phonesWithImages, { transaction });

      await transaction.commit();
    } catch (err) {
      console.log(err);

      await transaction.rollback();
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('phones', null, {});
  }
};
