const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

exports.createRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.SECRET, (err, user) => {
    console.log(user);
    if (err) return err.message;
    return generateAccessToken({ user: user.user });
  });
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).send(err);
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) => {
  const authUser = { user: user };
  return jwt.sign(authUser, process.env.SECRET, {
    algorithm: "HS256",
    expiresIn: "30s",
  });
};

const generateRefreshToken = (user) => {
  const authUser = { user: user };
  return jwt.sign(authUser, process.env.SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};
