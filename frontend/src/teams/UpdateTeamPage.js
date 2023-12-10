import React, { useEffect, useState } from "react";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import "./TeamsForms.css";
import api from "../shared/api";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const UpdateTeamPage = () => {
  const [cities, setCities] = useState([]);
  const [identifiedTeam, setIdentifiedTeam] = useState();
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
  const history = useHistory();
  const teamID = useParams().teamID;

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await api.get(`/teams/get/${teamID}`);
        setIdentifiedTeam(res.data);
        setFormData(
          {
            name: {
              value: res.data.name,
              isValid: true,
            },
            city: {
              value: res.data.city,
              isValid: true,
            },
            sportType: {
              value: res.data.sportType,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };
    getTeam();
  }, [setFormData, teamID]);

  const teamUpdateSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      name: formState.inputs.name.value,
      city: formState.inputs.city.value,
      sportType: formState.inputs.sportType.value,
    };
    api.put(`teams/${teamID}`, body).then((res) => {
      history.push("/");
    });
  };

  if (!identifiedTeam) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find game!</h2>
        </Card>
      </div>
    );
  }

  return (
    <Card className="team-form">
      <h2>Update Team</h2>
      <hr />
      <form onSubmit={teamUpdateSubmitHandler}>
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
          initialValue={identifiedTeam.name}
          initialValid={true}
        />
        <Input
          id="city"
          element="dropbox"
          label="City"
          options={cities}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select a city"
          onInput={inputHandler}
          initialValue={identifiedTeam.city}
          initialValid={true}
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
          initialValue={identifiedTeam.sportType}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update Team
        </Button>
      </form>
    </Card>
  );
};

export default UpdateTeamPage;
