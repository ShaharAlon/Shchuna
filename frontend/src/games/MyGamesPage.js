import React, { useEffect, useState, useContext } from "react";
import GamesList from "./GamesList";
import api from "../shared/api";
import { AuthContext } from "../shared/context/auth-context";

const MyGamesPage = () => {
  const [gamesData, setGamesData] = useState([]);
  const auth = useContext(AuthContext);
  const getGames = () => {
    api
      .get(`games/getByPlayer/${auth.loggedUser}/`)
      .then((res) => {
        const games = res.data;
        setGamesData(games);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(getGames, []);
  return <GamesList items={gamesData} updateHandler={getGames} />;
};

export default MyGamesPage;
