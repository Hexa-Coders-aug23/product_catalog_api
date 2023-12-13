/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const jsonFolderPath = path.join(__dirname, '../store/phones');

    const combineJsonFiles = async folderPath => {
      try {
        const files = await fs.readdir(folderPath);

        const combinedData = await Promise.all(
          files
            .filter(file => file.endsWith('.json'))
            .map(async file => {
              const filePath = path.join(folderPath, file);
              const fileData = await fs.readFile(filePath, 'utf-8');
              return JSON.parse(fileData);
            })
        );

        return combinedData;
      } catch (error) {
        console.error('Error reading JSON files:', error);
        throw error;
      }
    };

    const serverBaseUrl = process.env.SERVER_URL;

    const normalizeImage = imagePath => {
      return `${serverBaseUrl}/${imagePath}`;
    };

    const phonesData = await combineJsonFiles(jsonFolderPath);

    const phonesWithImages = phonesData.map(phone => ({
      ...phone,
      images: JSON.stringify(phone.images.map(imagePath => normalizeImage(imagePath))),
      description: JSON.stringify(phone.description),
      capacityAvailable: JSON.stringify(phone.capacityAvailable),
      colorsAvailable: JSON.stringify(phone.colorsAvailable),
      cell: JSON.stringify(phone.cell),
    }));

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('phone_details', phonesWithImages, { transaction });

      await transaction.commit();
    } catch (err) {
      console.log(err);

      await transaction.rollback();
    }
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('phone_details', null, {});
  }
};
