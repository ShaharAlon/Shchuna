const mongoose = require("mongoose");

const gameScheme = new mongoose.Schema({
  orgnizer: { type: String, required: true },
  place: { type: String, required: true },
  city: { type: String, required: true },
  time: { type: Date, required: true },
  availableSpots: { type: Number, required: true },
  totalSpots: { type: Number, required: true },
  sportType: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Players" }],
});
module.exports = mongoose.model("Games", gameScheme);
