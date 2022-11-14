const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query"],
});

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
    res.status(400).send({ message: error });
  }

  return res.status(201).json(newRecord);
};

exports.findAll = async (req, res) => {
  let countries;
  try {
    countries = await prisma.zones.findMany();
  } catch (error) {
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findAllCountriesByMobileTariff = async (req, res) => {
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
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findAllCountriesByLandLineTariff = async (req, res) => {
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
    res.status(404).send({ message: error });
  }
  return res.status(200).json(zones);
};

exports.findAllMobilesZones = async (req, res) => {
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
    res.status(404).send({ message: error });
  }
  return res.status(200).json(zones);
};

exports.findAvailableLinesByCountry = async (req, res) => {
  let countries;

  try {
    countries = await prisma.zones.findMany({
      where: {
        Destination: {
          contains: `%${req.params.country} %`,
        },
      },
    });
  } catch (error) {
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findByZone = async (req, res) => {
  let record;
  let zoneparam = req.params.zone;
  try {
    record = await prisma.zones.findMany({
      where: {
        Zone: zoneparam,
      },
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
  return res.status(200).json(record);
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
    res.status(400).send({ message: error });
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
        MAGDestination:req.body.MAGDestination,
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
    res.status(400).send({ message: error });
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
    res.status(400).send({ message: error });
  }
  res.status(204).send();
};
