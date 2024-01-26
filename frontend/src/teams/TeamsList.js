import React from "react";
import Team from "./Team";
import {
  Grid,
  List,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const TeamsList = (props) => {
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
          <Typography variant='h5'>No Teams found</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container justifyContent='center'>
      <List>
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
      </List>
    </Grid>
  );
};

export default TeamsList;
