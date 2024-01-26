const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const gameController = require("./Controllers/GameController");
const playerController = require("./Controllers/PlayerController");
const notificationController = require("./Controllers/NotificationController");
const teamController = require("./Controllers/TeamController");

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

// GAMES API
app.get("/api/games/", gameController.getGames);
app.get("/api/games/getByID/:gameID", gameController.getGameByID);
app.get("/api/games/getByCity/:city", gameController.getGamesByCity);
app.get("/api/games/getByPlayer/:playerID", gameController.getGamesByPlayer);
app.post("/api/games/add", gameController.addGame);
app.post("/api/games/join", gameController.joinGame);
app.post("/api/games/unjoin", gameController.unjoinGame);
app.delete("/api/games/:gameID", gameController.deleteGame);
app.put("/api/games/:gameID", gameController.updateGame);

// PLAYERS API
app.get("/api/players/", playerController.getPlayers);
app.get("/api/players/get/:playerID", playerController.getPlayer);
app.get(
  "/api/players/getPlayersByGame/:gameID",
  playerController.getPlayersByGame
);
app.get(
  "/api/players/getPlayersByTeam/:teamID",
  playerController.getPlayersByTeam
);
app.get(
  "/api/players/getNotifications/:playerID",
  notificationController.getNotifications
);
app.delete(
  "/api/players/deleteNotification/:notificationID",
  notificationController.deleteNotification
);
app.post("/api/players/signup", playerController.signup);
app.post("/api/players/login", playerController.login);

// TEAMS API
app.get("/api/teams/", teamController.getTeams);
app.get("/api/teams/get/:teamID", teamController.getTeam);
app.get("/api/teams/getMyTeams/:playerID", teamController.getTeamsByPlayer);
app.post("/api/teams/add", teamController.createTeam);
app.post("/api/teams/join", teamController.joinTeam);
app.post("/api/teams/unjoin", teamController.unjoinTeam);
app.delete("/api/teams/:teamID", teamController.deleteTeam);
app.put("/api/teams/:teamID", teamController.updateTeam);

mongoose
  .connect(
    "mongodb+srv://xxshahar:noaosher@cluster0.ao9sqqy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(process.env.PORT || 8000);
  })
  .catch((err) => {
    console.log(err);
  });
