const express = require("express");
const zonesRouter = express.Router();
const auth = require("../security/jwt");
const zonesController = require("../controller/zonesController");

/**
 * @swagger
 * components:
 *  schemas:
 *    Zone:
 *      type: object
 *      properties:
 *        ID:
 *          type: int
 *        MAGCode:
 *          type: string
 *        MAGDestination:
 *          type: string
 *        Destination:
 *          type: string
 *        Key:
 *          type: string
 *        Zone:
 *          type: string
 *        RateBusinessGBP:
 *          type: string
 *        RateResidentialGBP:
 *          type: string
 *        RateEU:
 *          type: string
 *        RateUSD:
 *          type: string
 *      example:
 *        ID: 1769
 *        MAGCode: "1"
 *        MAGDestination: Afghanistan
 *        Destination: Afghanistan
 *        Key: "1"
 *        Zone: "Z9"
 *        RateBusinessGBP: "0.20"
 *        RateResidentialGBP: "0.20"
 *        RateEU: "0.30"
 *        RateUSD: "0.36"
 */

/**
 * @swagger
 * tags:
 *  name: Zones
 *  description: Zones API methods
 */

/**
 * @swagger
 * /api/zones:
 *   get:
 *     tags: [Zones]
 *     summary: Returns list of all zones
 *     responses:
 *      200:
 *        description: A Json array of zones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Zone'
 *                    
*/
zonesRouter.get("/zones", zonesController.findAll);
zonesRouter.get("/zones/landline", zonesController.findAllLandLineZones);
zonesRouter.get("/zones/mobile", zonesController.findAllMobilesZones);

/**
 * @swagger
 * /api/zones/country/{country}:
 *   get:
 *     tags: [Zones]
 *     summary: Returns lines available by country
 *     parameters:
 *       - in: path
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the country
 *     responses:
 *      200:
 *        description: A Json array of zones for the selected country
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Zone'
 *      404:
 *        description: Country not found
*/
zonesRouter.get(
  "/zones/country/:country",
  zonesController.findAvailableLinesByCountry
);

zonesRouter.get("/zones/:zone", zonesController.findByZone);

zonesRouter.get(
  "/countries/mobile",
  zonesController.findAllCountriesByMobileTariff
);
zonesRouter.get(
  "/countries/landline",
  zonesController.findAllCountriesByLandLineTariff
);
zonesRouter.get("/countries/:id", zonesController.findById);

zonesRouter.post(
  "/create",
  auth.authenticateAdminToken,
  zonesController.create
);

zonesRouter.put(
  "/countries/update/:id",
  auth.authenticateAdminToken,
  zonesController.update
);

zonesRouter.delete(
  "/countries/delete/:id",
  auth.authenticateAdminToken,
  zonesController.delete
);

module.exports = zonesRouter;
