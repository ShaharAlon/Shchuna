import React, { useState, useEffect } from "react";
import api from "../shared/api";

const PlayersList = (props) => {
  const [playersDetails, setPlayersDetails] = useState([]);
  const url = props.isTeam
    ? `players/getPlayersByTeam/${props.ID}`
    : `players/getPlayersByGame/${props.ID}`;
  const getPlayers = () => {
    api
      .get(url)
      .then((res) => {
        const players = res.data;
        setPlayersDetails(players);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(getPlayers, []);

  return (
    <div>
      <h2>Players List:</h2>
      <hr />
      {playersDetails.map((player, index) => (
        <div key={index}>
          <h3>
            {index + 1}. {player.name},Phone: {player.phone}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default PlayersList;
