const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.create = async (req, res) => {
  let newRecord;
  try {
    newRecord = await prisma.zones.create({
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

  return res.status(201).json(newRecord);
};

exports.findAllCountries = async(req, res) => {
  let countries;
  try {
    countries = await prisma.zones.findMany()
  } catch (error) {
    res.status(404).send({ message: error });
  }
  return res.status(200).json(countries);
}
