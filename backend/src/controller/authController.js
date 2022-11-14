const { PrismaClient } = require("@prisma/client");
const auth = require("../security/authentication");

const prisma = new PrismaClient({
  log: ["query"],
});

exports.signup = async (req, res) => {
  const body = req.body;
  const user = await prisma.users.findFirst({
    where: {
      user: body.user,
    },
    select: {
      user: true,
      password: true,
    },
  });
  if (!user) {
    return res.status(400).send("Cannot find user");
  } else if (user.password !== body.password) {
    res.status(400).send("Wrong password");
  } else {
    const token = auth.createToken(user.user);
    res.status(200).json({ accessToken: token });
  }
};
