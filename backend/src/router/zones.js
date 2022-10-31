const express = require("express");
const zonesRouter = express.Router();
const zonesController = require("../controller/zonesController");

zonesRouter.get("/zones/landline", zonesController.findAllLandLineZones);
zonesRouter.get("/zones/mobile", zonesController.findAllMobilesZones);

zonesRouter.get("/countries", zonesController.findAllCountries);
zonesRouter.get("/countries/mobile", zonesController.findAllCountriesByMobileTariff);
zonesRouter.get("/countries/landline", zonesController.findAllCountriesByLandLineTariff);
zonesRouter.get("/countries/:id", zonesController.findById);

zonesRouter.post("/create", zonesController.create);

zonesRouter.put("/countries/update/:id", zonesController.update);

zonesRouter.delete("/countries/delete/:id", zonesController.delete);

module.exports = zonesRouter;
