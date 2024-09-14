"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idKendaraan: {
        type: Sequelize.INTEGER,
        allowNull: "false",
        references: {
          key: "id",
          model: "Kendaraans",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      tanggalService: {
        type: Sequelize.DATE,
      },
      debet: {
        type: Sequelize.INTEGER,
      },
      kredit: {
        type: Sequelize.INTEGER,
      },
      deskripsi: {
        type: Sequelize.STRING,
      },
      statusService:{
        type : Sequelize.STRING,
        defaultValue : "Proses Service"
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
    await queryInterface.dropTable("Services");
  },
};
