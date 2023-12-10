const Notification = require("../Models/NotificationModel");

const notify = (senderID, message, approve, receiversID) => {
  const newNotification = new Notification({
    sender: senderID,
    message: message,
    receivers: receiversID,
  });
  newNotification.save();
};

const getNotifications = (req, res) => {
  Notification.find({ receivers: { $elemMatch: { $eq: req.params.playerID } } })
    .then((notifications) => res.status(200).json(notifications))
    .catch((err) =>
      res.status(404).json({ error: "No notification found by this id" + err })
    );
};

const deleteNotification = (req, res) => {
  Notification.findByIdAndDelete({ _id: req.params.notificationID })
    .then((notification) => res.status(200).json(notification))
    .catch((err) =>
      res.status(404).json({ error: "No notification found by this id" + err })
    );
};

exports.notify = notify;
exports.getNotifications = getNotifications;
exports.deleteNotification = deleteNotification;
