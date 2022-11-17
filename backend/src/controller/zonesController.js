const { PrismaClient } = require("@prisma/client");
const logger = require("../utils/logger");

const prisma = new PrismaClient();

exports.create = async (req, res) => {
  let newRecord;
  try {
    newRecord = await prisma.zones.create({
      data: {
        MAGCode: req.body.MAGCode,
        MAGDestination: req.body.MAGDestination,
        Destination: req.body.Destination,
        Key: req.body.Key,
        Zone: req.body.Zone,
        RateBusinessGBP: req.body.RateBusinessGBP,
        RateResidentialGBP: req.body.RateResidentialGBP,
        RateEU: req.body.RateEU,
        RateUSD: req.body.RateUSD,
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(400).send({ message: error });
  }

  return res.status(201).json(newRecord);
};

exports.findAll = async (req, res) => {
  let countries;
  try {
    countries = await prisma.zones.findMany();
  } catch (error) {
    logger.warn(error);
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findAllZonesForMobileTariff = async (req, res) => {
  let countries;

  try {
    countries = await prisma.zones.findMany({
      where: {
        NOT: {
          OR: [
            {
              Zone: {
                contains: "Z",
              },
            },
            {
              Zone: "?",
            },
          ],
        },
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findAllZonesForLandLineTariff = async (req, res) => {
  let countries;

  try {
    countries = await prisma.zones.findMany({
      where: {
        OR: [
          {
            Zone: {
              contains: "Z",
            },
          },
          {
            Zone: "?",
          },
        ],
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findAllLandLineZones = async (req, res) => {
  let zones;

  try {
    zones = await prisma.zones.groupBy({
      by: ["Zone"],
      where: {
        OR: [
          {
            Zone: {
              contains: "Z",
            },
          },
          {
            Zone: "?",
          },
        ],
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(404).send({ message: error });
  }
  return res.status(200).json(zones);
};

exports.findAllMobileZones = async (req, res) => {
  let zones;

  try {
    zones = await prisma.zones.groupBy({
      by: ["Zone"],
      where: {
        NOT: {
          OR: [
            {
              Zone: {
                contains: "Z",
              },
            },
            {
              Zone: "?",
            },
          ],
        },
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(404).send({ message: error });
  }
  return res.status(200).json(zones);
};

exports.findAvailableLinesByZone = async (req, res) => {
  let countries;

  try {
    countries = await prisma.zones.findMany({
      where: {
        OR: [
          {
            Destination: {
              contains: `%${req.params.country} %`,
            },
          },
          { Destination: req.params.country },
        ],
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(404).send({ message: error });
  }
  if (!countries.length) {
    logger.warn("Country not found");
    return res.status(404).send({ message: "Country not found" });
  }
  return res.status(200).json(countries);
};

exports.findByZone = async (req, res) => {
  let records;
  let zoneparam = req.params.zone;
  try {
    records = await prisma.zones.findMany({
      where: {
        Zone: zoneparam,
      },
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
  if (!records.length) {
    return res.status(404).send({ message: "Zone not found" });
  }
  return res.status(200).json(records);
};

exports.findById = async (req, res) => {
  let record;
  try {
    record = await prisma.zones.findUniqueOrThrow({
      where: {
        ID: Number(req.params.id),
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(404).send(error);
  }
  return res.status(201).json(record);
};

exports.update = async (req, res) => {
  let updatedRecord;
  try {
    updatedRecord = await prisma.zones.update({
      where: {
        ID: Number(req.params.id),
      },
      data: {
        MAGCode: req.body.MAGCode,
        MAGDestination: req.body.MAGDestination,
        Destination: req.body.Destination,
        Key: req.body.Key,
        Zone: req.body.Zone,
        RateBusinessGBP: req.body.RateBusinessGBP,
        RateResidentialGBP: req.body.RateResidentialGBP,
        RateEU: req.body.RateEU,
        RateUSD: req.body.RateUSD,
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(400).send(error);
  }
  return res.status(200).json(updatedRecord);
};

exports.delete = async (req, res) => {
  try {
    await prisma.zones.delete({
      where: {
        ID: Number(req.params.id),
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(400).send({ message: error });
  }
  res.status(204).send();
};
