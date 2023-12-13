'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('phones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
      },
      phoneId: {
        type: Sequelize.STRING,
        references: {
          model: 'phone_details',
          key: 'id',
        },
      },
      itemId: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      fullPrice: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      screen: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      ram: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('phone_details');
  }
};
