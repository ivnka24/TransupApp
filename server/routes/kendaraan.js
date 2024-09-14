const KendaraanController = require("../controllers/KendaraanController");

const routes = require("express").Router();

routes.post("/", KendaraanController.insertKendaraan);
routes.get("/ready", KendaraanController.getKendaraanReady);
routes.get("/", KendaraanController.getAllKendaraan);
routes.get("/:id", KendaraanController.getIdKendaraan);
routes.put("/:id", KendaraanController.updateKendaraan);
routes.delete("/:id", KendaraanController.deleteKendaraan);
module.exports = routes;
