import React, { useEffect, useState } from "react";
import TeamsList from "./TeamsList";
import Service from "../shared/Service";

const TeamsPage = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTeams = async () => {
    const res = await Service.getTeams();
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

export default TeamsPage;
