const express = require("express");
const authRouter = express.Router();

authRouter.post("/signup", (req, res) => {
  const { user, password } = req.body;

  console.log(user, password);

  res.send("Auth route working");
});


module.exports = authRouter;