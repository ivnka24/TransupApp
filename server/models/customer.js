"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Sewa, {
        foreignKey: "idCustomer",
      });
    }
  }
  Customer.init(
    {
      namaLengkap: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Nama lengkap tidak boleh kosong" },
          notNull: { msg: "Nama lengkap tidak boleh kosong" },
        },
      },
      alamat: DataTypes.TEXT,
      domisili: DataTypes.STRING,
      NIK: {
        type: DataTypes.STRING,
        unique: { msg: "NIK sudah terdaftar" },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "NIK tidak boleh kosong!",
          },
          notNull: {
            msg: "NIK tidak boleh kosong!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
