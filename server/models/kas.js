'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kas.init({
    keterangan: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    deskripsi: DataTypes.STRING,
    jumlah: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kas',
  });
  return Kas;
};