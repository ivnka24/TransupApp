const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_TOKEN;

const createToken = (payload) => {
  return jwt.sign(payload, SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { createToken, verifyToken };
