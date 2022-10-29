const express = require("express");
const zonesRouter = express.Router();
const zonesController = require("../controller/zonesController");


zonesRouter.post("/create", zonesController.create);
zonesRouter.get("/countries", zonesController.findAllCountries);

module.exports = zonesRouter;
