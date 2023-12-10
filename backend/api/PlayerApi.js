const express = require("express");
const controller = require("../Controllers/PlayerController");
const Notifications = require("../Controllers/NotificationController");
const router = express.Router();

router.get("/", controller.getPlayers);

router.get("/get/:playerID", controller.getPlayer);

router.get("/getPlayersByGame/:gameID", controller.getPlayersByGame);

router.get("/getPlayersByTeam/:teamID", controller.getPlayersByTeam);

router.get("/getNotifications/:playerID", Notifications.getNotifications);

router.delete(
  "/deleteNotification/:notificationID",
  Notifications.deleteNotification
);

router.post("/signup", controller.signup);

router.post("/login", controller.login);

module.exports = router;
