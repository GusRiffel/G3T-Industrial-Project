const { PrismaClient } = require("@prisma/client");
const auth = require("../security/jwt");
const logger = require("../utils/logger");

const prisma = new PrismaClient();

exports.signUp = async (req, res) => {
  const body = req.body;
  let newUser;

  if (!validateBody(body)) {
    logger.warn("Please fill in all required fields");
    return res.status(400).send("Please fill in all required fields");
  } else if (await validateUserAvailability(body.user)) {
    logger.warn("User already registered");
    return res.status(400).send("User already registered");
  }

  try {
    newUser = await prisma.users.create({
      data: {
        user: body.user,
        password: body.password,
        role: "user",
      },
    });
  } catch (error) {
    logger.warn(error);
    res.status(400).send({ message: error });
  }
  return res.status(201).json(newUser);
};

exports.signIn = async (req, res) => {
  const body = req.body;
  let user;
  if (!validateBody(body)) {
    logger.warn("Please fill in all required fields");
    return res.status(400).send("Please fill in all required fields");
  }
  try {
    user = await prisma.users.findFirst({
      where: {
        user: body.user,
      },
      select: {
        user: true,
        password: true,
        role: true,
      },
    });
  } catch (error) {
    logger.warn(error);
    return res.status(500).send(error);
  }
  if (!user) {
    logger.warn("User not found");
    return res.status(400).send("User not found");
  } else if (user.password !== body.password) {
    logger.warn("Wrong password");
    res.status(400).send("Wrong password");
  } else {
    const token = auth.createToken({ user: user.user, role: user.role });
    res.status(200).json(token);
  }
};

exports.refreshAccessToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    logger.warn("Invalid refresh Token")
    return res.sendStatus(400);
  }
  const newToken = auth.createRefreshToken(refreshToken);
  if (newToken.error) {
    logger.warn(newToken);
    res.status(400).json(newToken);
  }
  res.status(201).json({ accessToken: newToken });
};

const validateUserAvailability = async (user) => {
  let userFound;
  try {
    userFound = await prisma.users.findFirst({
      where: {
        user: user,
      },
    });
  } catch (error) {
    return error;
  }
  return userFound;
};

const validateBody = (body) => {
  if (Object.values(body).length !== 2) {
    return false;
  }
  return Object.values(body).every((field) => field !== null && field !== "");
};
