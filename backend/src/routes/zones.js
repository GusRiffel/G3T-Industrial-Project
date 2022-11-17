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
 *    ZoneBody:
 *      type: object
 *      properties:
 *        MAGCode:
 *          type: string
 *          default: 2
 *        MAGDestination:
 *          type: string
 *          default: testDestination
 *        Destination:
 *          type: string
 *          default: testDestination
 *        Key:
 *          type: string
 *          default: 1
 *        Zone:
 *          type: string
 *          default: Z3
 *        RateBusinessGBP:
 *          type: string
 *          default: 0.2
 *        RateResidentialGBP:
 *          type: string
 *          default: 0.2
 *        RateEU:
 *          type: string
 *          default: 0.3
 *        RateUSD:
 *          type: string
 *          default: 0.4
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

/**
 * @swagger
 * /api/zones/zone/{zone}:
 *   get:
 *     tags: [Zones]
 *     summary: Returns zones available by zone
 *     parameters:
 *       - in: path
 *         name: zone
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the zone
 *     responses:
 *      200:
 *        description: A Json array of zones for the selected zone
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Zone'
 *      404:
 *        description: Zone not found
*/
zonesRouter.get("/zones/zone/:zone", zonesController.findByZone);

/**
 * @swagger
 * /api/zones/id/{id}:
 *   get:
 *     tags: [Zones]
 *     summary: Returns zone by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id for the desired zone
 *     responses:
 *      200:
 *        description: A Json with the zone for the selected id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Zone'           
 *      404:
 *        description: Not found error
*/
zonesRouter.get("/zones/id/:id", zonesController.findById);

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
  zonesController.findAvailableLinesByZone
);

/**
 * @swagger
 * /api/zones/landline:
 *   get:
 *     tags: [Zones]
 *     summary: Returns list of all landline zones
 *     responses:
 *      200:
 *        description: A Json array of all landline zones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  Zone:
 *                    type: string
 *                example:
 *                  Zone: Z1
*/
zonesRouter.get("/zones/landline", zonesController.findAllLandLineZones);

/**
 * @swagger
 * /api/zones/landline/tariff:
 *   get:
 *     tags: [Zones]
 *     summary: Returns list of all zones with landline lines and its tariff
 *     responses:
 *      200:
 *        description: A Json array of zones with landline lines
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Zone'
 *                    
*/
zonesRouter.get(
  "/zones/landline/tariff",
  zonesController.findAllZonesForLandLineTariff
);

/**
 * @swagger
 * /api/zones/mobile:
 *   get:
 *     tags: [Zones]
 *     summary: Returns list of all mobile zones
 *     responses:
 *      200:
 *        description: A Json array of all mobile zones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  Zone:
 *                    type: string
 *                example:
 *                  Zone: X
*/
zonesRouter.get("/zones/mobile", zonesController.findAllMobileZones);

/**
 * @swagger
 * /api/zones/mobile/tariff:
 *   get:
 *     tags: [Zones]
 *     summary: Returns list of all zones with mobile lines and its tariff
 *     responses:
 *      200:
 *        description: A Json array of zones with mobile lines
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Zone'
 *                    
*/
zonesRouter.get(
  "/zones/mobile/tariff",
  zonesController.findAllZonesForMobileTariff
);

/**
 * @swagger
 * /api/zones/create:
 *   post:
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     summary: Creates new zone
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ZoneBody'
 *     responses:
 *       201:
 *         description: Created, zone successfully created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#components/schemas/Zone'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, check response body
 */
zonesRouter.post(
  "/zones/create",
  auth.authenticateAdminToken,
  zonesController.create
);

/**
 * @swagger
 * /api/zones/update/{id}:
 *   put:
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     summary: Updates zone
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the desired zone
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ZoneBody'
 *     responses:
 *       200:
 *         description: Success, zone successfully updated
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#components/schemas/Zone'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, check response body
 */
zonesRouter.put(
  "/zones/update/:id",
  auth.authenticateAdminToken,
  zonesController.update
);

/**
 * @swagger
 * /api/zones/delete/{id}:
 *   delete:
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes zone
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the desired zone
 *     responses:
 *       204:
 *         description: No Content success, zone successfully deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, check response body
 */
zonesRouter.delete(
  "/zones/delete/:id",
  auth.authenticateAdminToken,
  zonesController.delete
);

module.exports = zonesRouter;
