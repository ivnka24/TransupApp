async function isAdmin(req, res, next) {
  try {
    if (req.user.role !== "Admin") {
      throw {
        name: "unauthorized",
      };
    }
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = isAdmin;
