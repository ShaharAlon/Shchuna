const mongoose = require("mongoose");

const teamScheme = new mongoose.Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  sportType: { type: String, required: true },
  players: { type: [String], required: true },
});
module.exports = mongoose.model("Teams", teamScheme);
