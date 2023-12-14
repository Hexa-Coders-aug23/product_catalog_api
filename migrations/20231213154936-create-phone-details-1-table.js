'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('phone_details', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      namespaceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacityAvailable: {
        type: Sequelize.JSONB,
      },
      capacity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      priceRegular: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceDiscount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      colorsAvailable: {
        type: Sequelize.JSONB,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      images: {
        type: Sequelize.JSONB,
      },
      description: {
        type: Sequelize.JSONB,
      },
      screen: {
        type: Sequelize.STRING,
      },
      resolution: {
        type: Sequelize.STRING,
      },
      processor: {
        type: Sequelize.STRING,
      },
      ram: {
        type: Sequelize.STRING,
      },
      camera: {
        type: Sequelize.STRING,
      },
      zoom: {
        type: Sequelize.STRING,
      },
      cell: {
        type: Sequelize.JSONB,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('phone_details');
  },
};
