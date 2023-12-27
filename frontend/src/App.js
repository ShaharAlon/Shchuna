import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SignPage from "./players/SignPage";
import MainNavigation from "./shared/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import GamesPage from "./games/GamesPage";
import AddGamePage from "./games/AddGamePage";
import MyGamesPage from "./games/MyGamesPage";
import UpdateGame from "./games/UpdateGame";
import TeamsPage from "./teams/TeamsPage";
import AddTeamPage from "./teams/AddTeamPage";
import UpdateTeam from "./teams/UpdateTeamPage";
import MyTeamsPage from "./teams/MyTeamsPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoggedUser, setLoggedUser] = useState(0);

  const login = useCallback((_id) => {
    setIsLoggedIn(true);
    setLoggedUser(_id);
    localStorage.setItem("userID", _id);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setLoggedUser(0);
    localStorage.removeItem("userID");
  }, []);

  useEffect(() => {
    const storedID = localStorage.getItem("userID");
    if (storedID) {
      login(storedID);
    }
  }, [login]);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    isErr: false,
    message: "",
  });

  const handleAlert = (message, isErr) => {
    setAlertMessage({ isErr: isErr, message: message });
    setAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <GamesPage />
        </Route>
        <Route path='/mygames' exact>
          <MyGamesPage />
        </Route>
        <Route path='/addgame' exact>
          <AddGamePage setAlertMessage={handleAlert} />
        </Route>
        <Route path='/updateGame/:gameID'>
          <UpdateGame setAlertMessage={handleAlert} />
        </Route>
        <Route path='/teams' exact>
          <TeamsPage />
        </Route>
        <Route path='/myteams' exact>
          <MyTeamsPage />
        </Route>
        <Route path='/addteam' exact>
          <AddTeamPage setAlertMessage={handleAlert} />
        </Route>
        <Route path='/updateTeam/:teamID'>
          <UpdateTeam setAlertMessage={handleAlert} />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <GamesPage />
        </Route>
        <Route path='/teams' exact>
          <TeamsPage />
        </Route>
        <Route path='/auth'>
          <SignPage setAlertMessage={handleAlert} />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loggedUser: LoggedUser,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
        <Snackbar open={alert} autoHideDuration={2400} onClose={handleClose}>
          <MuiAlert
            severity={alertMessage.isErr ? "error" : "success"}
            sx={{ width: "100%" }}
            onClose={handleClose}
          >
            {alertMessage.message}
          </MuiAlert>
        </Snackbar>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
