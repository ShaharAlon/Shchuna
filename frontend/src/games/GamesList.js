import React from "react";
import Game from "./Game";
import dayjs from "dayjs";
import {
  Grid,
  List,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const GamesList = (props) => {
  if (props.isLoading) {
    return (
      <Grid container justifyContent='center'>
        <CircularProgress />
      </Grid>
    );
  }

  if (props.items.length === 0 && !props.isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography variant='h5'>No games found</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container justifyContent='center'>
      <List>
        {props.items
          .filter((a) => dayjs(a.time) > dayjs())
          .sort((a, b) => dayjs(a.time) - dayjs(b.time))
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
          .filter((a) => dayjs(a.time) < dayjs())
          .sort((a, b) => dayjs(b.time) - dayjs(a.time))
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
              expired={true}
            />
          ))}
      </List>
    </Grid>
  );
};

export default GamesList;
