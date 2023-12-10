const mongoose = require("mongoose");

const NotificationScheme = new mongoose.Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  receivers: { type: [String], required: true },
});
module.exports = mongoose.model("Notifications", NotificationScheme);
