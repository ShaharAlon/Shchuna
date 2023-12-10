import React, { useEffect, useState } from "react";
import TeamsList from "./TeamsList";
import api from "../shared/api";

const TeamsPage = () => {
  const [teamsData, setTeamsData] = useState([]);

  const getTeams = () => {
    api
      .get("teams/")
      .then((res) => {
        const teams = res.data;
        setTeamsData(teams);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(getTeams, []);
  return <TeamsList items={teamsData} updateHandler={getTeams} />;
};

export default TeamsPage;
