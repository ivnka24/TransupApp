'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kendaraan.init({
    jenisKendaraan: DataTypes.STRING,
    platMotor: DataTypes.STRING,
    ccKendaraan: DataTypes.INTEGER,
    noRangka: DataTypes.INTEGER,
    noMesin: DataTypes.INTEGER,
    pajak: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kendaraan',
  });
  return Kendaraan;
};