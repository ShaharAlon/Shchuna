import React, { useEffect, useState } from "react";
import GamesList from "./GamesList";
import Service from "../shared/Service";

const GamesPage = () => {
  const [gamesData, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGames = async () => {
    const res = await Service.getGames();
    setGamesData(res);
    setIsLoading(false);
  };
  useEffect(() => {
    getGames();
  }, []);
  return (
    <GamesList
      items={gamesData}
      isLoading={isLoading}
      updateHandler={getGames}
    />
  );
};

export default GamesPage;
