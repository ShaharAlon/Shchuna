const express = require("express");
const controller = require("../Controllers/TeamController");
const router = express.Router();

router.get("/", controller.getTeams);

router.get("/get/:teamID", controller.getTeam);

router.get("/getMyTeams/:playerID", controller.getTeamsByPlayer);

router.post("/add", controller.createTeam);

router.post("/join", controller.joinTeam);

router.post("/unjoin", controller.unjoinTeam);

router.delete("/:teamID", controller.deleteTeam);

router.put("/:teamID", controller.updateTeam);

module.exports = router;
