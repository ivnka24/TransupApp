const routes = require("express").Router();
const UserController = require("../controllers/UserController");
const userRoute = require("./user");
const costumerRoute = require("./customer");
const kendaraanRoute = require("./kendaraan");
const sewaRoute = require("./sewa");
const serviceRoute = require("./service");
const kasRoute = require("./kas");
const authentication = require("../auth/authentication");
routes.get("/", (req, res) => {
  res.send("Test Running");
});
routes.post("/login", UserController.Login);
routes.use(authentication);
routes.use("/kendaraan", kendaraanRoute);
routes.use("/customer", costumerRoute);
routes.use("/users", userRoute);
routes.use("/sewa", sewaRoute);
routes.use("/service", serviceRoute);
routes.use("/kas", kasRoute);

module.exports = routes;
