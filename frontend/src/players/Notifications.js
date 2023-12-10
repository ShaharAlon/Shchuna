import React, { useState, useEffect } from "react";
import api from "../shared/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Notifications.css";

const Notifications = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const getNotifications = () => {
    api
      .get(`players/getNotifications/${props.playerID}`)
      .then((res) => {
        const notifications = res.data;
        setNotifications(notifications);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(getNotifications, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleDeleteNotification = (notificationID) => {
    api
      .delete(`players/deleteNotification/${notificationID}`)
      .then(setShowNotifications(!showNotifications));
  };

  return (
    <div className="notifications">
      <button className="notification-bell" onClick={toggleNotifications}>
        <FontAwesomeIcon icon={faBell} />
      </button>
      {showNotifications && (
        <div className="notification-dropdown">
          {notifications.length === 0 && (
            <div key={0} className="notification-item">
              {"Nothing new here"}
            </div>
          )}
          {notifications.map((notification) => (
            <div key={notification._id} className="notification-item">
              {notification.message}
              <button
                className="notification-xmark"
                onClick={() => handleDeleteNotification(notification._id)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
