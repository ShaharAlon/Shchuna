const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const gameApi = require("./api/GameApi");
const playerApi = require("./api/PlayerApi");
const teamApi = require("./api/TeamApi");

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/games", gameApi);
app.use("/api/players", playerApi);
app.use("/api/teams", teamApi);

mongoose
  .connect(
    "mongodb+srv://xxshahar:noaosher@cluster0.ao9sqqy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
