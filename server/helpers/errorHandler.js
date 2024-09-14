function errorHandler(err, req, res, next) {
  let code = 500;
  let message = "Internal Server Error";
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "username/password required") {
    code = 401;
    message = "Username atau Password tidak boleh kosong";
  } else if (err.name === "invalid user") {
    code = 401;
    message = "Username/Password tidak sesuai";
  } else if (err.name === "NotFound") {
    code = 404;
    message = `${err.type} tidak di temukan`;
  } else if (
    err.name === "invalid_token" ||
    err.name === "JsonWebTokenError" ||
    err.name === "invalid username/password"
  ) {
    code = 401;
    if (!err.type) {
      message = `invalid token`;
    } else {
      message = `${err.type}`;
    }
  } else if (err.name === "unauthorized") {
    code = 403;
    message = "Hanya admin memiliki akses ini";
  }
  res.status(code).json({ message });
}

module.exports = errorHandler;
