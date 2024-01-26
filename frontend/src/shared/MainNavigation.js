import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import Service from "./Service";

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notificationsList, setNotificationsList] = useState([]);

  const getNotifications = async () => {
    const res = await Service.getNotifications(auth.loggedUser);
    if (res.status === 200) {
      setNotificationsList(res.data);
    } else {
      props.setAlertMessage(res.data.error, true);
    }
  };

  useEffect(() => {
    if (auth.loggedUser !== 0) {
      getNotifications();
    }
  }, [auth.loggedUser]);

  const handleNotificationClick = (event) => {
    getNotifications();
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleDeleteNotification = async (notificationId) => {
    const res = await Service.deleteNotification(notificationId);
    if (res.status === 200) {
      handleNotificationClose();
      getNotifications();
    } else {
      props.setAlertMessage(res.data.error, true);
    }
  };

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    marginRight: "16px",
  };

  return (
    <AppBar position='sticky' sx={{ background: "#131E3A" }}>
      <Toolbar>
        <Typography variant='h4' style={{ flexGrow: 1 }}>
          Shchuna
        </Typography>
        <Link to='/' style={linkStyle}>
          <Button color='inherit'>Games</Button>
        </Link>
        <Link to='/teams' style={linkStyle}>
          <Button color='inherit'>Teams</Button>
        </Link>
        {auth.isLoggedIn ? (
          <>
            <Link to='/mygames' style={linkStyle}>
              <Button color='inherit'>My Games</Button>
            </Link>
            <Link to='/myteams' style={linkStyle}>
              <Button color='inherit'>My Teams</Button>
            </Link>
            <Link to='/addteam' style={linkStyle}>
              <Button color='inherit'>Add Team</Button>
            </Link>
            <Link to='/addgame' style={linkStyle}>
              <Button color='inherit'>Add Game</Button>
            </Link>
            <Button variant='outlined' color='inherit' onClick={auth.logout}>
              Logout
            </Button>
            <IconButton color='inherit' onClick={handleNotificationClick}>
              <Badge badgeContent={notificationsList.length} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notificationAnchorEl}
              open={
                Boolean(notificationAnchorEl) && notificationsList.length > 0
              }
              onClose={handleNotificationClose}
            >
              {notificationsList.map((notification) => (
                <MenuItem key={notification._id}>
                  {notification.message}
                  <IconButton
                    color='error'
                    aria-label='delete'
                    onClick={() => handleDeleteNotification(notification._id)}
                    size='small'
                    style={{ marginLeft: "auto" }}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Link to='/auth' style={linkStyle}>
            <Button variant='outlined' color='inherit'>
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
