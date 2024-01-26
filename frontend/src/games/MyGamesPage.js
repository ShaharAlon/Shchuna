import React, { useEffect, useState, useContext } from "react";
import GamesList from "./GamesList";
import Service from "../shared/Service";
import { AuthContext } from "../shared/context/auth-context";

const MyGamesPage = () => {
  const [gamesData, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);
  const getGames = async () => {
    const res = await Service.getMyGames(auth.loggedUser);
    setGamesData(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getGames();
  }, []);
  return (
    <GamesList
      items={gamesData}
      updateHandler={getGames}
      isLoading={isLoading}
    />
  );
};

export default MyGamesPage;
