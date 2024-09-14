let bcrypt = require("bcryptjs");

let hashedPassword = (password) => {
  password = bcrypt.hashSync(password, 10);
  return password;
};

module.exports = hashedPassword;
