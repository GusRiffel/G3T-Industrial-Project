const express = require("express");
const app = express(); 
const port = 3000; 
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Worlds"); 
});

app.get("/cachorro", (req, res) => {
  res.send("Hello Cachorros"); 
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
  console.log("Alterou");
});
