import React from "react";
import Game from "./Game";
import Card from "../shared/components/UIElements/Card";
import "./GamesList.css";

const GamesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No games found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="games-list">
      {props.items
        .filter((a) => new Date(a.time) > new Date())
        .sort((a, b) => new Date(a.time) - new Date(b.time))
        .map((game) => (
          <Game
            key={game._id}
            gameID={game._id}
            orgnizer={game.orgnizer}
            place={game.place}
            city={game.city}
            time={game.time}
            availableSpots={game.availableSpots}
            sportType={game.sportType}
            players={game.players}
            updateHandler={props.updateHandler}
            expired={false}
          />
        ))}
      {props.items
        .filter((a) => new Date(a.time) < new Date())
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .map((game) => (
          <Game
            key={game._id}
            gameID={game._id}
            orgnizer={game.orgnizer}
            place={game.place}
            city={game.city}
            time={game.time}
            availableSpots={game.availableSpots}
            players={game.players}
            updateHandler={props.updateHandler}
            expired={true}
          />
        ))}
    </ul>
  );
};

export default GamesList;
