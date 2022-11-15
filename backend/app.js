const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const zonesRouter = require("./src/router/zones");
const userRouter = require("./src/router/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", zonesRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
