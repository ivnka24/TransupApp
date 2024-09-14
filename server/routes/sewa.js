const SewaController = require("../controllers/RentalCustomers");

const routes = require("express").Router();
routes.get("/", SewaController.getAllSewa);
routes.post("/", SewaController.insertSewa);
routes.patch("/:id", SewaController.updateTanggalKembali);
routes.patch("/selesai/:id", SewaController.updateSelesaiSewa);
module.exports = routes;
