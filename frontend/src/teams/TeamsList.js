import React from "react";
import Team from "./Team";
import Card from "../shared/components/UIElements/Card";
import "./TeamsList.css";

const TeamsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Teams found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="teams-list">
      {props.items.map((team) => (
        <Team
          key={team._id}
          teamID={team._id}
          name={team.name}
          owner={team.owner}
          city={team.city}
          sportType={team.sportType}
          players={team.players}
          updateHandler={props.updateHandler}
        />
      ))}
    </ul>
  );
};

export default TeamsList;
