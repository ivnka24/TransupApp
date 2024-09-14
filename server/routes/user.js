const isAdmin = require("../auth/authorization");
const UserController = require("../controllers/UserController");

const routes = require("express").Router();

routes.post("/", isAdmin, UserController.createUser);

routes.get("/", isAdmin, UserController.getAllUser);

routes.get("/:id", isAdmin, UserController.searchUserId);

routes.put("/:id", isAdmin, UserController.updateUser);

routes.delete("/:id", isAdmin, UserController.deleteUser);

module.exports = routes;
