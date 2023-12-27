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
import { styled } from "@mui/material/styles";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { List, ListItem, ListItemText } from "@mui/material";
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

const Team = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const isJoined = props.players.some(
    (player) => player._id === auth.loggedUser
  );
  const isOwner = props.owner === auth.loggedUser;

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const joinHandler = async () => {
    setExpanded(!expanded);
    const body = {
      teamID: props.teamID,
      _id: auth.loggedUser,
    };

    const res = await Service.joinTeam(body);

    if (res.status === 200) {
      props.updateHandler();
    }
  };

  const unjoinHandler = async () => {
    setExpanded(!expanded);
    const body = {
      teamID: props.teamID,
      _id: auth.loggedUser,
    };

    const res = await Service.unjoinTeam(body);

    if (res.status === 200) {
      props.updateHandler();
    }
  };

  const deleteHandler = async () => {
    const res = await Service.deleteTeam();

    if (res.status === 200) {
      props.updateHandler();
    }
  };

  const updateHandler = () => {
    history.push(`/updateTeam/${props.teamID}`);
  };

  return (
    <ListItem key={props.teamID}>
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
          <Typography variant='h5'>{props.name}</Typography>
          <Typography variant='h5'>{props.city}</Typography>

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
                    display: isOwner || !auth.isLoggedIn ? "none" : "undefined",
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
                    display: isOwner ? "undefined" : "none",
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
                    display: isOwner ? "undefined" : "none",
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
              Do you want to proceed and delete this Team? Please note that it
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

export default Team;
