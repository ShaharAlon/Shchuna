import React, { useEffect, useContext, useState } from "react";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import { AuthContext } from "../shared/context/auth-context";
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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const AddGamePage = () => {
  const [cities, setCities] = useState([]);
  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Volleyball",
    "Footvolley",
  ];

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
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [formState, inputHandler] = useForm(
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
      totalSpots: {
        value: "",
        isValid: false,
      },
      sportType: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const GameSubmitHandler = async (event) => {
    event.preventDefault();
    const body = {
      _id: auth.loggedUser,
      place: formState.inputs.place.value,
      city: formState.inputs.city.value,
      time: formState.inputs.time.value,
      totalSpots: formState.inputs.totalSpots.value,
      sportType: formState.inputs.sportType.value,
    };
    await api.post("games/add/", body).then(() => {
      history.push("/");
    });
  };

  return (
    <Card className="game-form">
      <h2>New Game</h2>
      <hr />
      <form onSubmit={GameSubmitHandler}>
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
        />
        <Input
          id="city"
          element="dropbox"
          label="City"
          options={cities}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid city"
          onInput={inputHandler}
        />
        <Input
          id="time"
          element="datetime"
          label="Time"
          initialValue={new Date()}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid time."
          onInput={inputHandler}
        />
        <Input
          id="totalSpots"
          element="input"
          label="Total Spots"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MIN(1),
            VALIDATOR_MAX(99),
          ]}
          errorText="Please enter a valid total spots."
          onInput={inputHandler}
        />
        <Input
          id="sportType"
          element="dropbox"
          type="text"
          label="Sport"
          options={sports}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select a sport."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Game
        </Button>
      </form>
    </Card>
  );
};

export default AddGamePage;
