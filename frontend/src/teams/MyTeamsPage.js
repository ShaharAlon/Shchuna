import React, { useEffect, useState, useContext } from "react";
import TeamsList from "./TeamsList";
import Service from "../shared/Service";
import { AuthContext } from "../shared/context/auth-context";

const MyTeamsPage = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);

  const getTeams = async () => {
    const res = await Service.getMyTeams(auth.loggedUser);
    setTeamsData(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getTeams();
  }, []);
  return (
    <TeamsList
      items={teamsData}
      updateHandler={getTeams}
      isLoading={isLoading}
    />
  );
};

export default MyTeamsPage;
