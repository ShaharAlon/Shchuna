const mongoose = require("mongoose");

const playerScheme = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  sportType: { type: String, required: true },
});
module.exports = mongoose.model("Players", playerScheme);
