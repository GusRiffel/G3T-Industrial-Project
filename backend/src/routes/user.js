const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        ID:
 *          type: int
 *        user:
 *          type: string
 *        password:
 *          type: string
 *        role:
 *          type: string
 *      example:
 *        ID: 1
 *        user: user
 *        password: user123
 *        role: user
 *    UserBody:
 *      type: object
 *      properties:
 *        user:
 *          type: string
 *          default: user
 *        password:
 *          type: string
 *          default: user123
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users API methods
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserBody'
 *     responses:
 *       201:
 *         description: Success, user created
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exists
 */
userRouter.post("/signup", userController.signUp);
userRouter.post("/signIn", userController.signIn);
userRouter.post("/token", userController.refreshToken);

module.exports = userRouter;
