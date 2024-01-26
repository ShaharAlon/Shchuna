const Game = require("../Models/GameModel");
const Player = require("../Models/PlayerModel");
const Notification = require("./NotificationController");

const getGames = (req, res) => {
  Game.find()
    .populate("players")
    .then((games) => res.status(200).json(games))
    .catch((err) => res.status(404).json({ error: "No game found" + err }));
};

const getGameByID = (req, res) => {
  Game.findById({ _id: req.params.gameID })
    .then((game) => res.status(200).json(game))
    .catch((err) =>
      res.status(404).json({ error: "No game found by this id" + err })
    );
};
const getGamesByCity = (req, res) => {
  Game.find({ city: req.params.city })
    .then((game) => res.status(200).json(game))
    .catch((err) =>
      res.status(404).json({ error: "No game found by this id" + err })
    );
};

const getGamesByPlayer = (req, res) => {
  Game.find({ players: { $elemMatch: { $eq: req.params.playerID } } })
    .populate("players")
    .then((game) => res.status(200).json(game))
    .catch((err) =>
      res.status(404).json({ error: "No game found by this id" + err })
    );
};

const addGame = (req, res) => {
  const newGame = new Game({
    orgnizer: req.body._id,
    place: req.body.place,
    city: req.body.city,
    time: req.body.time,
    totalSpots: req.body.totalSpots,
    availableSpots: req.body.totalSpots - 1,
    sportType: req.body.sportType,
    players: [req.body._id],
  });
  newGame
    .save()
    .then((game) => res.status(200).json(game))
    .catch((err) => res.status(500).json({ error: "Failed to create" + err }));
};

const joinGame = (req, res) => {
  Game.findByIdAndUpdate(
    req.body.gameID,
    { $push: { players: req.body._id } },
    { new: true }
  )
    .then((game) => {
      Player.findById({ _id: req.body._id }).then((player) =>
        Notification.notify(
          req.body._id,
          `${player.name} joined your game in ${game.place} `,
          game.players.filter((a) => a !== req.body._id)
        )
      );
      res.status(200).json(game);
    })
    .catch((err) =>
      res.status(404).json({ error: "No Game found by this id" + err })
    );
};

const unjoinGame = (req, res) => {
  Game.findByIdAndUpdate(
    req.body.gameID,
    { $pull: { players: req.body._id } },
    { new: true }
  )
    .then((game) => {
      Player.findById({ _id: req.body._id }).then((player) =>
        Notification.notify(
          req.body._id,
          `${player.name} left your game in ${game.place}`,
          game.players.filter((a) => a !== req.body._id)
        )
      );
      res.status(200).json(game);
    })
    .catch((err) =>
      res.status(404).json({ error: "No Team found by this id" + err })
    );
};

const updateGame = (req, res) => {
  Game.findByIdAndUpdate(req.params.gameID, {
    $set: {
      place: req.body.place,
      city: req.body.city,
      time: req.body.time,
      availableSpots: req.body.availableSpots,
    },
  })
    .then((game) => {
      Notification.notify(
        game.orgnizer,
        `One of your games got updated`,
        game.players
      );
      res.status(200).json(game);
    })
    .catch((err) => res.status(500).json({ error: "Failed to edit" + err }));
};

const deleteGame = (req, res) => {
  Game.findByIdAndDelete({ _id: req.params.gameID })
    .then((game) => {
      Notification.notify(
        game.orgnizer,
        `One of your games got deleted`,
        game.players
      );
      res.status(200).json(game);
    })
    .catch((err) =>
      res.status(404).json({ error: "No game found by this id" + err })
    );
};

exports.getGames = getGames;
exports.getGameByID = getGameByID;
exports.getGamesByCity = getGamesByCity;
exports.getGamesByPlayer = getGamesByPlayer;
exports.addGame = addGame;
exports.unjoinGame = unjoinGame;
exports.joinGame = joinGame;
exports.updateGame = updateGame;
exports.deleteGame = deleteGame;
