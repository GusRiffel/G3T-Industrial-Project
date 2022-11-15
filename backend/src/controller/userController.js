const { PrismaClient } = require("@prisma/client");
const auth = require("../security/authentication");

const prisma = new PrismaClient({
  log: ["query"],
});

exports.signUp = async (req, res) => {
  const body = req.body;
  let newUser;
  if (await validateUserAvailability(body.user)) {
    return res.status(400).send({ message: "User already registered" });
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
    res.status(400).send({ message: error });
  }
  return res.status(201).json(newUser);
};

exports.signIn = async (req, res) => {
  const body = req.body;
  let user;
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
    return res.status(500).send(error);
  }
  if (!user) {
    return res.status(400).send("Cannot find user");
  } else if (user.password !== body.password) {
    res.status(400).send("Wrong password");
  } else {
    const token = auth.createToken(user);
    res.status(200).json(token);
  }
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  const newToken = auth.createRefreshToken(refreshToken);
  res.json({ accessToken: newToken });
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
