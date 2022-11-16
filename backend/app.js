const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const port = 3000;

const zonesRouter = require("./src/routes/zones");
const userRouter = require("./src/routes/user");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ZONES API Docs",
      version: "1.0.0",
      description:
        "Find out rates for international calls in, a simple, quick, and straightforward way",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", zonesRouter);
app.use("/api/user", userRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
  console.log(`Docs available at http://localhost:${port}/api/docs`);
});
