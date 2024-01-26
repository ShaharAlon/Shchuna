const Player = require("../Models/PlayerModel");
const Game = require("../Models/GameModel");
const Team = require("../Models/TeamModel");

const getPlayers = (req, res) => {
  Player.find()
    .then((players) => res.status(200).json(players))
    .catch((err) => res.status(404).json({ error: "No player found" + err }));
};

const getPlayer = (req, res) => {
  Player.findById({ _id: req.params.playerID })
    .then((player) => res.status(200).json(player))
    .catch((err) =>
      res.status(404).json({ error: "No player found by this id" + err })
    );
};

const getPlayersByGame = (req, res) => {
  Game.findById({ _id: req.params.gameID })
    .then((game) =>
      Player.find({ _id: { $in: game.players } }).then((players) =>
        res.status(200).json(players)
      )
    )
    .catch((err) =>
      res.status(404).json({ error: "No player found by this id" + err })
    );
};

const getPlayersByTeam = (req, res) => {
  Team.findById({ _id: req.params.teamID })
    .then((team) =>
      Player.find({ _id: { $in: team.players } }).then((players) =>
        res.status(200).json(players)
      )
    )
    .catch((err) =>
      res.status(404).json({ error: "No player found by this id" + err })
    );
};

const signup = async (req, res) => {
  const existingPlayer = await Player.findOne({ email: req.body.email });
  if (existingPlayer) {
    res.status(500).json({ error: "Email already exists try login instead" });
    return res;
  }

  const newPlayer = new Player({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    sportType: req.body.sportType,
  });
  newPlayer
    .save()
    .then((player) => res.status(200).json(player))
    .catch((err) => res.status(500).json({ error: "Failed to create" + err }));
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const existingPlayer = await Player.findOne({ email: email });

  if (!existingPlayer || existingPlayer.password !== password) {
    return res.status(500).json({ error: "Wrong email or password try again" });
  }

  res.status(200).json(existingPlayer);
};

exports.getPlayers = getPlayers;
exports.getPlayersByGame = getPlayersByGame;
exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayer = getPlayer;
exports.signup = signup;
exports.login = login;
