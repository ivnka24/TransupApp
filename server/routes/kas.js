const KasController = require("../controllers/KasController");

const routes = require("express").Router();
routes.post("/", KasController.InsertKas);
routes.get("/", KasController.getAllKas);
routes.get("/balance", KasController.calculateBalance);

module.exports = routes;
