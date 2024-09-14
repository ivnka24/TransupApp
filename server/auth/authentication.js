const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    if (!req.headers.authorization) {
      throw { name: "invalid_token" };
    }
    const tokenWords = req.headers.authorization.trim().split(/\s+/).length;
    if (tokenWords > 2) {
      throw { name: "invalid_token" };
    }
    const token = req.headers.authorization.split(" ")[1];
    const payload = verifyToken(token);
    const findUser = await User.findByPk(payload.id);
    if (!findUser) {
      throw { name: "invalid_token" };
    }
    req.user = {
      id: payload.id,
      role: findUser.role,
      username: findUser.username,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
