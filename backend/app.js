const express = require("express");
const app = express(); 
const port = 3000; 
const cors = require("cors");

const zonesRouter = require("./src/router/zones");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(zonesRouter);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
