const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.createToken = (user) => {
  const authUser = { user: user };
  return jwt.sign(authUser, secret, { algorithm: "HS256" });
};
