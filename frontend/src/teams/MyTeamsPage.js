import React, { useEffect, useState, useContext } from "react";
import TeamsList from "./TeamsList";
import api from "../shared/api";
import { AuthContext } from "../shared/context/auth-context";

const MyTeamsPage = () => {
  const [teamsData, setTeamsData] = useState([]);
  const auth = useContext(AuthContext);
  const getTeams = () => {
    api
      .get(`teams/getMyTeams/${auth.loggedUser}/`)
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

export default MyTeamsPage;
