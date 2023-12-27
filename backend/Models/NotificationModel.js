const mongoose = require("mongoose");

const NotificationScheme = new mongoose.Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  receiver: { type: String, required: true },
});
module.exports = mongoose.model("Notifications", NotificationScheme);
