const CustomerController = require("../controllers/CustomerController");

const routes = require("express").Router();

routes.post("/", CustomerController.createCustomers);
routes.get("/", CustomerController.getAllCustomers);
routes.get("/:NIK", CustomerController.getCustomerByNIK);
routes.get("/:id", CustomerController.getCustomerById);
routes.put("/:id", CustomerController.updateCust);
routes.delete("/:id", CustomerController.deleteCust);
module.exports = routes;
