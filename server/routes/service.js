const ServiceController = require("../controllers/ServiceController");

const routes = require("express").Router();
routes.post("/", ServiceController.insertService);
routes.get("/", ServiceController.getService);
routes.get("/:id", ServiceController.getServiceById);
routes.put("/:id", ServiceController.updateKredit);
// routes.put("/:id", ServiceController.updateService);
routes.patch("/:id", ServiceController.updateService);
module.exports = routes;
