"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sewas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idCustomer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Customers",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      idKendaraan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Kendaraans",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      hargaSewa: {
        type: Sequelize.INTEGER,
      },
      tanggalSewa: {
        type: Sequelize.DATE,
      },
      tanggalKembali: {
        type: Sequelize.DATE,
      },
      tujuan: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "Belum Selesai",
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
    await queryInterface.dropTable("Sewas");
  },
};
