import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import Card from "../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_MAXLENGTH,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import "./GamesForms.css";
import api from "../shared/api";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UpdateGame = () => {
  const [cities, setCities] = useState([]);
  const [identifiedGame, setIdentifiedGame] = useState();
  const history = useHistory();

  const getCities = () => {
    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", {
        country: "israel",
      })
      .then((res) => {
        const citiesList = res.data.data;
        setCities(citiesList);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(getCities, []);

  const gameID = useParams().gameID;

  const [formState, inputHandler, setFormData] = useForm(
    {
      place: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      time: {
        value: new Date(),
        isValid: false,
      },
      availableSpots: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getGame = async () => {
      try {
        const res = await api.get(`/games/getByID/${gameID}`);
        setIdentifiedGame(res.data);
        setFormData(
          {
            place: {
              value: res.data.place,
              isValid: true,
            },
            city: {
              value: res.data.city,
              isValid: true,
            },
            time: {
              value: new Date(res.data.time),
              isValid: true,
            },
            availableSpots: {
              value: res.data.availableSpots,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };
    getGame();
  }, [setFormData, gameID]);

  const gameUpdateSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      place: formState.inputs.place.value,
      city: formState.inputs.city.value,
      time: formState.inputs.time.value,
      availableSpots: formState.inputs.availableSpots.value,
    };
    api.put(`games/${gameID}`, body).then((res) => {
      history.push("/");
    });
  };

  if (!identifiedGame) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find game!</h2>
        </Card>
      </div>
    );
  }

  return (
    <Card className="game-form">
      <h2>Update Game</h2>
      <hr />
      <form onSubmit={gameUpdateSubmitHandler}>
        <Input
          id="place"
          element="input"
          type="text"
          label="Place"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(2),
            VALIDATOR_MAXLENGTH(50),
          ]}
          errorText="Please enter a valid place."
          onInput={inputHandler}
          initialValue={identifiedGame.place}
          initialValid={true}
        />
        <Input
          id="city"
          element="dropbox"
          label="City"
          options={cities}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid city"
          onInput={inputHandler}
          initialValue={identifiedGame.city}
          initialValid={true}
        />
        <Input
          id="time"
          element="datetime"
          label="Time"
          initialValue={new Date(identifiedGame.time)}
          initialValid={true}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid time."
          onInput={inputHandler}
        />
        <Input
          id="availableSpots"
          element="input"
          label="Available Spots"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MIN(0),
            VALIDATOR_MAX(99),
          ]}
          errorText="Please enter a valid Available Spots."
          onInput={inputHandler}
          initialValue={identifiedGame.availableSpots}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update Game
        </Button>
      </form>
    </Card>
  );
};

export default UpdateGame;
