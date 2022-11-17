const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

exports.createToken = (user) => {
  return {
    user: user.user,
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

exports.createRefreshToken = (refreshToken) => {
  return jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) return { error: err.message };
      return generateAccessToken({ user: user.user });
    }
  );
};

exports.authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    logger.warn("Unauthorized, missing auth token");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      logger.warn(err);
      return res.status(403).send(err);
    } else if (user.user.role.toUpperCase() !== "admin".toUpperCase()) {
      logger.warn("Administrators only");
      return res.status(403).send("Administrators only");
    }
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) => {
  const authUser = { user: user };
  return jwt.sign(authUser, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

const generateRefreshToken = (user) => {
  const authUser = { user: user };
  return jwt.sign(authUser, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
};
