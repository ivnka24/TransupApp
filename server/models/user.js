"use strict";
const { Model } = require("sequelize");
const hashedPassword = require("../helpers/hashedPassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      namaLengkap: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Nama Lengkap tidak boleh kosong" },
          notNull: { msg: "Nama Lengkap tidak boleh kosong" },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Username sudah di pakai",
        },
        validate: {
          notEmpty: { msg: "Username Tidak boleh kosong" },
          notNull: { msg: "Username Tidak boleh kosong" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password Tidak boleh kosong" },
          notNull: { msg: "Password Tidak boleh kosong" },
        },
      },
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = hashedPassword(user.password);
        },
        // beforeUpdate(user) {
        //   if (user.changed("password")) {
        //     user.password = hashedPassword(user.password);
        //   }
        // },
        // beforeSave(user) {
        //   if (user.changed("password")) {
        //     user.password = hashedPassword(user.password);
        //   }
        // },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
