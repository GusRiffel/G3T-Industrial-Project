const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/signIn", userController.signIn);
userRouter.post("/signUp", userController.signUp);
userRouter.post("/token", userController.refreshToken);

module.exports = userRouter;
