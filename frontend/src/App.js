import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import SignPage from "./players/SignPage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
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

  const login = useCallback((_id, LoggedUserTeam) => {
    setIsLoggedIn(true);
    setLoggedUser(_id);
    localStorage.setItem("userID", _id);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setLoggedUser("");
    localStorage.removeItem("userID");
  }, []);

  useEffect(() => {
    const storedID = localStorage.getItem("userID");
    if (storedID) {
      login(storedID);
    }
  }, [login]);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <GamesPage />
        </Route>
        <Route path="/mygames" exact>
          <MyGamesPage />
        </Route>
        <Route path="/games/add" exact>
          <AddGamePage />
        </Route>
        <Route path="/updateGame/:gameID">
          <UpdateGame />
        </Route>
        <Route path="/teams" exact>
          <TeamsPage />
        </Route>
        <Route path="/myteams" exact>
          <MyTeamsPage />
        </Route>
        <Route path="/addTeam" exact>
          <AddTeamPage />
        </Route>
        <Route path="/updateTeam/:teamID">
          <UpdateTeam />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <GamesPage />
        </Route>
        <Route path="/auth">
          <SignPage />
        </Route>
        <Redirect to="/" />
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
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
