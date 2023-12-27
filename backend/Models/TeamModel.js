const mongoose = require("mongoose");

const teamScheme = new mongoose.Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  sportType: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Players" }],
});
module.exports = mongoose.model("Teams", teamScheme);
