import React, { useState, useContext } from "react";
import Avatar from "../shared/components/UIElements/Avatar";
import Card from "../shared/components/UIElements/Card";
import Modal from "../shared/components/UIElements/Modal";
import Button from "../shared/components/FormElements/Button";
import PlayersList from "../players/PlayersList";
import * as images from "../images";
import api from "../shared/api";
import "./Team.css";
import { AuthContext } from "../shared/context/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Team = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isClickedTeam, setIsClicked] = useState(false);
  const TeamClickHandler = () => {
    setIsClicked(!isClickedTeam);
  };
  const isOwner = props.owner === auth.loggedUser;
  const isJoined = props.players.includes(auth.loggedUser);

  const joinHandler = async () => {
    setIsClicked(!isClickedTeam);
    const body = {
      teamID: props.teamID,
      _id: auth.loggedUser,
    };

    await api.post("teams/join", body).then((res) => {
      props.updateHandler();
    });
  };

  const unjoinHandler = async () => {
    setIsClicked(!isClickedTeam);
    const body = {
      teamID: props.teamID,
      _id: auth.loggedUser,
    };

    await api.post("teams/unjoin", body).then((res) => {
      props.updateHandler();
    });
  };

  const deleteHandler = async () => {
    await api.delete(`teams/${props.teamID}`).then((res) => {
      props.updateHandler();
    });
  };

  const updateHandler = () => {
    history.push(`/updateTeam/${props.teamID}`);
  };

  return (
    <li className="team" onClick={TeamClickHandler}>
      <Card className="team__content">
        <a>
          <div className="team__image">
            <Avatar image={images[`${props.sportType}`]} alt={props.name} />
          </div>
          <div className="team__info">
            <h2>{props.name}</h2>
            <h2>{props.city}</h2>
            {isClickedTeam && <PlayersList isTeam={true} ID={props.teamID} />}
            {isClickedTeam && auth.isLoggedIn && !isJoined && !isOwner && (
              <Button join type="submit" onClick={joinHandler}>
                {"JOIN"}
              </Button>
            )}
            {isClickedTeam && auth.isLoggedIn && isOwner && (
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
            {isClickedTeam && auth.isLoggedIn && isJoined && !isOwner && (
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
                Do you want to proceed and delete this Team? Please note that it
                can't be undone.
              </p>
            </Modal>
          </div>
        </a>
      </Card>
    </li>
  );
};

export default Team;
