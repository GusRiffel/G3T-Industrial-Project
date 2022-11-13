const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query"],
});

exports.create = async (req, res) => {
  let newRecord;
  try {
    newRecord = await prisma.zones.create({
      data: {},
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
      select: {
        country: true,
        mobile_tariff: true,
      },
      where: {
        mobile: true,
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
      select: {
        country: true,
        land_tariff: true,
      },
      where: {
        landline: true,
      },
    });
  } catch (error) {
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findAllLandLineZones = async (req, res) => {
  let countries;

  try {
    countries = await prisma.zones.findMany({
      select: {
        country: true,
        land_zone: true,
      },
      where: {
        landline: true,
      },
    });
  } catch (error) {
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findAllMobilesZones = async (req, res) => {
  let countries;

  try {
    countries = await prisma.zones.findMany({
      select: {
        country: true,
        mobile_zone: true,
      },
      where: {
        mobile: true,
      },
    });
  } catch (error) {
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findAvailableLinesByCountry = async (req, res) => {
  let countries;

  try {
    countries = await prisma.zones.findMany({
      select: {
        country: true,
        land_zone: true,
        land_tariff: true,
        mobile_zone: true,
        mobile_tariff: true,
      },
      where: {
        country: req.params.country,
      },
    });
  } catch (error) {
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
};

exports.findByZone = async (req, res) => {
  let record;
  let zone = req.params.zone;
  try {
    record = await prisma.zones.findMany({
      where: {
        ...(Number(zone) ? { land_zone: zone } : { mobile_zone: zone }),
      },
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
  return res.status(201).json(record);
};

exports.findById = async (req, res) => {
  let record;
  try {
    record = await prisma.zones.findUniqueOrThrow({
      where: {
        id: Number(req.params.id),
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
        id: Number(req.params.id),
      },
      data: {
        country: req.body.country,
        land_zone: req.body.land_zone,
        mobile_zone: req.body.mobile_zone,
        land_tariff: req.body.land_tariff,
        mobile_tariff: req.body.mobile_tariff,
        mobile: req.body.mobile,
        landline: req.body.landline,
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
        id: Number(req.params.id),
      },
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
  res.status(204).send();
};
