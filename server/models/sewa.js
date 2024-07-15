'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sewa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sewa.init({
    idCustomer: DataTypes.STRING,
    idKendaraan: DataTypes.STRING,
    hargaSewa: DataTypes.STRING,
    tanggalSewa: DataTypes.STRING,
    jamSewa: DataTypes.STRING,
    tanggalKembali: DataTypes.DATE,
    tujuan: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sewa',
  });
  return Sewa;
};