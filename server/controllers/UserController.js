const hashedPassword = require("../helpers/hashedPassword");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
let bcrypt = require("bcryptjs");
class UserController {
  static async createUser(req, res, next) {
    try {
      const { namaLengkap, username, password, role } = req.body;
      let createUser = await User.create({
        namaLengkap,
        username,
        password,
        role,
      });
      const createUserObject = createUser.get({ plain: true });
      const { password: _, ...userWithoutPassword } = createUserObject;

      res.status(201).json({ data: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  }

  static async Login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw { name: "username/password required" };
      }
      let findUser = await User.findOne({ where: { username } });
      if (!findUser) {
        throw { name: "invalid user" };
      }
      const verifyPassword = bcrypt.compareSync(password, findUser.password);
      if (!verifyPassword) {
        throw { name: "invalid user" };
      }
      const payload = {
        id: findUser.id,
        username: findUser.username,
        role: findUser.role,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async searchUserId(req, res, next) {
    try {
      const { id } = req.params;
      const findUser = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!findUser) throw { name: "NotFound", type: "User" };
      res.status(200).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { namaLengkap, username, password, role } = req.body;
      let hashedPass;
      if (password) {
        hashedPass = hashedPassword(password);
      }
      console.log(hashedPass, "<<<");

      const findUser = await User.findByPk(id);
      if (!findUser) throw { name: "NotFound", type: "User" };

      const [updated] = await User.update(
        { namaLengkap, username, password: hashedPass, role },
        { where: { id } }
      );

      if (updated) {
        res
          .status(200)
          .json({ message: `User ${namaLengkap} berhasil di update` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      // Find the user by id
      const findUser = await User.findByPk(id);
      if (!findUser) throw { name: "NotFound", type: "User" };

      await User.destroy({ where: { id } });

      res.status(200).json({
        message: `User dengan nama ${findUser.namaLengkap} berhasil di hapus`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const offset = (page - 1) * limit;

      const { rows: users, count: totalUsers } = await User.findAndCountAll({
        attributes: { exclude: ["password"] },
        order: [["createdAt", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      const totalPages = Math.ceil(totalUsers / limit);

      res.status(200).json({
        data: users,
        pagination: {
          totalUsers,
          totalPages,
          currentPage: parseInt(page),
          pageSize: parseInt(limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
