const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

exports.createRefreshToken = (refreshToken) => {
  return jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, user) => {
      console.log(user);
      if (err) return err.message;
      return generateAccessToken({ user: user.user });
    }
  );
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(user.user.role);
    if (err) {
      return res.status(403).send(err);
    } else if (user.user.role !== "admin") {
      return res.status(403).send("Only admin allowed");
    }
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) => {
  const authUser = { user: user };
  return jwt.sign(authUser, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "30m",
  });
};

const generateRefreshToken = (user) => {
  const authUser = { user: user };
  return jwt.sign(authUser, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "3h",
  });
};
