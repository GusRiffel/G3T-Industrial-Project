const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const zonesRouter = require("./src/router/zones");
const authRouter = require("./src/router/auth");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", zonesRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
