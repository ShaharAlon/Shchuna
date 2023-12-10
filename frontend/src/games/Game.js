import React, { useState, useContext } from "react";
import Avatar from "../shared/components/UIElements/Avatar";
import Card from "../shared/components/UIElements/Card";
import Modal from "../shared/components/UIElements/Modal";
import Button from "../shared/components/FormElements/Button";
import PlayersList from "../players/PlayersList";
import * as images from "../images";
import api from "../shared/api";
import "./Game.css";
import { AuthContext } from "../shared/context/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
  const [isClickedGame, setIsClicked] = useState(false);
  const GameClickHandler = () => {
    setIsClicked(!isClickedGame && !props.expired);
  };
  const isJoined = props.players.includes(auth.loggedUser);
  const isOrgnizer = props.orgnizer === auth.loggedUser;

  const joinHandler = async () => {
    setIsClicked(!isClickedGame && !props.expired);
    const body = {
      gameID: props.gameID,
      _id: auth.loggedUser,
    };

    await api.post("games/join", body).then((res) => {
      props.updateHandler();
    });
  };

  const unjoinHandler = async () => {
    setIsClicked(!isClickedGame && !props.expired);
    const body = {
      gameID: props.gameID,
      _id: auth.loggedUser,
    };

    await api.post("games/unjoin", body).then((res) => {
      props.updateHandler();
    });
  };

  const deleteHandler = async () => {
    await api.delete(`games/${props.gameID}`).then((res) => {
      props.updateHandler();
    });
  };

  const updateHandler = () => {
    history.push(`/updateGame/${props.gameID}`);
  };

  return (
    <li className="game" onClick={GameClickHandler}>
      <Card className="game__content">
        <a>
          <div className="game__image">
            <Avatar image={images[`${props.sportType}`]} alt={props.name} />
          </div>
          <div className="game__info">
            <h2>{props.place}</h2>
            <h2>{props.city}</h2>
            <h2>{date}</h2>
            {!props.expired && (
              <h3>
                {props.availableSpots}{" "}
                {props.availableSpots === 1
                  ? "Available Spot"
                  : "Available Spots"}
              </h3>
            )}
            {props.expired && <h4>{"Expired!"}</h4>}
            {isClickedGame && <PlayersList isTeam={false} ID={props.gameID} />}
            {isClickedGame &&
              auth.isLoggedIn &&
              !isJoined &&
              !isOrgnizer &&
              props.availableSpots > 0 && (
                <Button join type="submit" onClick={joinHandler}>
                  {"JOIN"}
                </Button>
              )}
            {isClickedGame && auth.isLoggedIn && isOrgnizer && (
              <React.Fragment>
                <Button update type="submit" onClick={updateHandler}>
                  {"UPDATE"}
                </Button>
                <Button
                  danger
                  type="submit"
                  onClick={() => setShowConfirmDelete(true)}
                >
                  {"DELETE"}
                </Button>
              </React.Fragment>
            )}
            {isClickedGame && auth.isLoggedIn && isJoined && !isOrgnizer && (
              <Button danger type="submit" onClick={unjoinHandler}>
                {"LEAVE"}
              </Button>
            )}
            <Modal
              show={showConfirmDelete}
              onCancel={() => setShowConfirmDelete(false)}
              header="Are you sure?"
              footer={
                <React.Fragment>
                  <Button inverse onClick={() => setShowConfirmDelete(false)}>
                    CANCEL
                  </Button>
                  <Button danger onClick={deleteHandler}>
                    DELETE
                  </Button>
                </React.Fragment>
              }
            >
              <p>
                Do you want to proceed and delete this game? Please note that it
                can't be undone.
              </p>
            </Modal>
          </div>
        </a>
      </Card>
    </li>
  );
};

export default Game;
