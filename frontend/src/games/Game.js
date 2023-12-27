import React, { useState, useContext } from "react";
import {
  Button,
  Paper,
  Avatar,
  IconButton,
  Typography,
  Collapse,
  Grid,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import * as images from "../images";
import Service from "../shared/Service";
import { AuthContext } from "../shared/context/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Game = (props) => {
  const date = new Date(props.time).toLocaleString("en-IL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const isJoined = props.players.some(
    (player) => player._id === auth.loggedUser
  );
  const isOrgnizer = props.orgnizer === auth.loggedUser;

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const joinHandler = async () => {
    setExpanded(!expanded);
    const body = {
      gameID: props.gameID,
      _id: auth.loggedUser,
    };

    const res = await Service.joinGame(body);

    if (res.status === 200) {
      props.updateHandler();
    }
  };

  const unjoinHandler = async () => {
    setExpanded(!expanded);
    const body = {
      gameID: props.gameID,
      _id: auth.loggedUser,
    };

    const res = await Service.unjoinGame(body);
    if (res.status === 200) {
      props.updateHandler();
    }
  };

  const deleteHandler = async () => {
    const res = await Service.deleteGame(props.gameID);
    if (res.status === 200) {
      props.updateHandler();
    }
  };

  const updateHandler = () => {
    history.push(`/updateGame/${props.gameID}`);
  };

  return (
    <ListItem key={props.gameID}>
      <Paper
        sx={{
          width: "700px",
          background: "#DFE9F5",
          paddingY: "10px",
          mb: "15px",
        }}
      >
        <Grid container direction='column' alignItems='center'>
          <Avatar
            src={images[`${props.sportType}`]}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant='h5'>{props.place}</Typography>
          <Typography variant='h5'>{props.city}</Typography>
          <Typography
            variant='h5'
            color={props.expired ? "red" : "text.secondary"}
          >
            {date}
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <List>
              {props.players.map((player) => (
                <ListItem key={player._id} divider>
                  <ListItemText
                    primary={player.name}
                    secondary={`Phone: ${player.phone}`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography
              variant='h6'
              color={props.expired ? "red" : "text.secondary"}
            >
              {props.availableSpots === 0
                ? "The game is full"
                : props.expired
                ? "The game is finished"
                : props.availableSpots === 1
                ? `${props.availableSpots} Spot left`
                : `${props.availableSpots} Spots left`}
            </Typography>
            <Grid
              container
              justifyContent='center'
              spacing={2}
              marginY={"10px"}
            >
              <Grid item>
                <Button
                  variant='contained'
                  color={isJoined ? "error" : "success"}
                  sx={{
                    minWidth: "90px",
                    display:
                      isOrgnizer || !auth.isLoggedIn || props.expired
                        ? "none"
                        : "undefined",
                  }}
                  onClick={isJoined ? unjoinHandler : joinHandler}
                >
                  {isJoined ? "Cancel Join" : "Join"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='warning'
                  sx={{
                    minWidth: "90px",
                    display: isOrgnizer ? "undefined" : "none",
                  }}
                  onClick={updateHandler}
                >
                  update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='error'
                  sx={{
                    minWidth: "90px",
                    display: isOrgnizer ? "undefined" : "none",
                  }}
                  onClick={() => setShowConfirmDelete(true)}
                >
                  delete
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Dialog
          open={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Do you want to proceed and delete this Game? Please note that it
              can't be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirmDelete(false)}>Cancel</Button>
            <Button color='error' onClick={deleteHandler} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </ListItem>
  );
};

export default Game;
