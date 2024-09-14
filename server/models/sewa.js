"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sewa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sewa.belongsTo(models.Customer, {
        foreignKey: "idCustomer",
      });

      Sewa.belongsTo(models.Kendaraan, {
        foreignKey: "idKendaraan",
      });
    }
  }
  Sewa.init(
    {
      idCustomer: DataTypes.STRING,
      idKendaraan: DataTypes.STRING,
      hargaSewa: DataTypes.INTEGER,
      tanggalSewa: DataTypes.DATE,
      tanggalKembali: DataTypes.DATE,
      tujuan: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sewa",
    }
  );
  return Sewa;
};
