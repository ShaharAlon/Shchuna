import React, { useEffect, useContext, useState } from "react";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import { AuthContext } from "../shared/context/auth-context";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import "./TeamsForms.css";
import api from "../shared/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const AddTeamPage = () => {
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
      name: {
        value: "",
        isValid: false,
      },
      city: {
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

  const TeamSubmitHandler = async (event) => {
    event.preventDefault();
    const body = {
      _id: auth.loggedUser,
      name: formState.inputs.name.value,
      city: formState.inputs.city.value,
      sportType: formState.inputs.sportType.value,
    };
    await api.post("teams/add/", body).then((res) => {
      history.push("/");
    });
  };

  return (
    <Card className="team-form">
      <h2>New Team</h2>
      <hr />
      <form onSubmit={TeamSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(2),
            VALIDATOR_MAXLENGTH(50),
          ]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="city"
          element="dropbox"
          label="City"
          options={cities}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select a city"
          onInput={inputHandler}
        />
        <Input
          element="dropbox"
          id="sportType"
          type="text"
          label="Sport"
          options={sports}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select a sport."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Team
        </Button>
      </form>
    </Card>
  );
};

export default AddTeamPage;
