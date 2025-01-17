"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Kendaraans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jenisKendaraan: {
        type: Sequelize.STRING,
      },
      platMotor: {
        type: Sequelize.STRING,
      },
      ccKendaraan: {
        type: Sequelize.INTEGER,
      },
      noRangka: {
        type: Sequelize.STRING,
      },
      noMesin: {
        type: Sequelize.STRING,
      },
      pajak: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "Ready",
      },
      kepemilikan: {
        type: Sequelize.STRING,
        defaultValue: "TransUp",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Kendaraans");
  },
};
