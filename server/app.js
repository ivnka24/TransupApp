require('dotenv').config()

var cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/index");
const errorHandler = require("./helpers/errorHandler");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);
app.listen(port, () => {
  console.log("App running on port :", port);
});
