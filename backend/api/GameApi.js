const express = require("express");
const controller = require("../Controllers/GameController");
const router = express.Router();

router.get("/", controller.getGames);

router.get("/getByID/:gameID", controller.getGameByID);

router.get("/getByCity/:city", controller.getGamesByCity);

router.get("/getByPlayer/:playerID", controller.getGamesByPlayer);

router.post("/add", controller.addGame);

router.post("/join", controller.joinGame);

router.post("/unjoin", controller.unjoinGame);

router.delete("/:gameID", controller.deleteGame);

router.put("/:gameID", controller.updateGame);

module.exports = router;
