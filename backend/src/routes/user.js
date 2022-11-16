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
 *    JWTResponse:
 *      type: object
 *      properties:
 *        user:
 *          type: string
 *        accessToken:
 *          type: string
 *        refreshToken:
 *         type: string
 *      example:
 *        user: user
 *        accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC
 *        refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IksQRF
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users API methods
 */

/**
 * @swagger
 * /api/user/signup:
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
 *         description: Bad request, check response body
 */
userRouter.post("/signup", userController.signUp);

/**
 * @swagger
 * /api/user/signin:
 *   post:
 *     tags: [Users]
 *     summary: Log in with user and password
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserBody'
 *     responses:
 *       200:
 *         description: Success, user logged in
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/JWTResponse'
 *       400:
 *         description: Bad request, check response body
 */
userRouter.post("/signIn", userController.signIn);

/**
 * @swagger
 * /api/user/token:
 *   post:
 *     tags: [Users]
 *     summary: Creates new access Token
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refreshToken:
 *                type: string
 *                default: eyJhbGciOiJIUzI1NiIsInR5cCI6IksQRF
 *     responses:
 *       201:
 *         description: Created, new access Token successfully created
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  default: eyJhbGciOiJIUzI1NiIsInR5cCI6IksQRF
 *       400:
 *         description: Bad Request, check response body
 */
userRouter.post("/token", userController.refreshToken);

module.exports = userRouter;
