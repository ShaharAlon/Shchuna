const Team = require("../Models/TeamModel");
const Player = require("../Models/PlayerModel");
const Notification = require("./NotificationController");

const getTeams = (req, res) => {
  Team.find()
    .then((teams) => res.status(200).json(teams))
    .catch((err) => res.status(404).json({ error: "No team found" + err }));
};

const getTeam = (req, res) => {
  Team.findById({ _id: req.params.teamID })
    .then((team) => res.status(200).json(team))
    .catch((err) =>
      res.status(404).json({ error: "No Team found by this id" + err })
    );
};
const getTeamsByPlayer = (req, res) => {
  Team.find({ players: { $elemMatch: { $eq: req.params.playerID } } })
    .then((team) => res.status(200).json(team))
    .catch((err) =>
      res.status(404).json({ error: "No team found by this id" + err })
    );
};

const createTeam = (req, res) => {
  const newTeam = new Team({
    owner: req.body._id,
    name: req.body.name,
    city: req.body.city,
    sportType: req.body.sportType,
    players: [req.body._id],
  });
  newTeam
    .save()
    .then((team) => res.status(200).json(team))
    .catch((err) => res.status(500).json({ error: "Failed to create" + err }));
};

const joinTeam = (req, res) => {
  Team.findByIdAndUpdate(
    req.body.teamID,
    { $push: { players: req.body._id } },
    { new: true }
  )
    .then((team) => {
      Player.findById({ _id: req.body._id }).then((player) =>
        Notification.notify(
          req.body._id,
          `${player.name} joined your team "${team.name}"`,
          team.players.filter((a) => a !== req.body._id)
        )
      );
      res.status(200).json(team);
    })
    .catch((err) =>
      res.status(404).json({ error: "No Team found by this id" + err })
    );
};

const unjoinTeam = (req, res) => {
  Team.findByIdAndUpdate(
    req.body.teamID,
    { $pull: { players: req.body._id } },
    { new: true }
  )
    .then((team) => {
      Player.findById({ _id: req.body._id }).then((player) =>
        Notification.notify(
          req.body._id,
          `${player.name} left your team "${team.name}"`,
          team.players.filter((a) => a !== req.body._id)
        )
      );
      res.status(200).json(team);
    })
    .catch((err) =>
      res.status(404).json({ error: "No Team found by this id" + err })
    );
};

const updateTeam = (req, res) => {
  Team.findByIdAndUpdate(req.params.teamID, {
    $set: {
      name: req.body.name,
      city: req.body.city,
      sportType: req.body.sportType,
    },
  })
    .then((team) => {
      Notification.notify(
        team.owner,
        `One of your teams got updated`,
        team.players
      );
      res.status(200).json(team);
    })
    .catch((err) => res.status(500).json({ error: "Failed to edit" + err }));
};

const deleteTeam = (req, res) => {
  Team.findByIdAndDelete({ _id: req.params.teamID })
    .then((team) => {
      Notification.notify(
        team.owner,
        `One of your teams got deleted`,
        team.players
      );
      res.status(200).json(team);
    })
    .catch((err) =>
      res.status(404).json({ error: "No team found by this id" + err })
    );
};

exports.getTeams = getTeams;
exports.getTeam = getTeam;
exports.getTeamsByPlayer = getTeamsByPlayer;
exports.createTeam = createTeam;
exports.unjoinTeam = unjoinTeam;
exports.joinTeam = joinTeam;
exports.updateTeam = updateTeam;
exports.deleteTeam = deleteTeam;
