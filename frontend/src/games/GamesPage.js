import React, { useEffect, useState } from "react";
import GamesList from "./GamesList";
import api from "../shared/api";

const GamesPage = () => {
  const [gamesData, setGamesData] = useState([]);

  const getGames = () => {
    api
      .get("games/")
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

export default GamesPage;
