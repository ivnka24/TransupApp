"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.Kendaraan, {
        foreignKey: "idKendaraan",
      });
    }
  }
  Service.init(
    {
      idKendaraan: DataTypes.INTEGER,
      tanggalService: DataTypes.DATE,
      debet: DataTypes.INTEGER,
      kredit: DataTypes.INTEGER,
      deskripsi: DataTypes.STRING,
      statusService: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
