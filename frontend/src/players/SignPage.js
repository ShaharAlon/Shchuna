import React, { useState, useContext } from "react";
import Modal from "../shared/components/UIElements/Modal";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from "../shared/context/auth-context";
import "./SignPage.css";
import api from "../shared/api";

const SignPage = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showFailed, setShowFailed] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");

  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Volleyball",
    "Footvolley",
  ];

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          phone: undefined,
          sportType: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          phone: {
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
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const body = isLoginMode
      ? {
          email: formState.inputs.email.value.toLowerCase(),
          password: formState.inputs.password.value,
        }
      : {
          email: formState.inputs.email.value.toLowerCase(),
          password: formState.inputs.password.value,
          name: formState.inputs.name.value,
          phone: formState.inputs.phone.value,
          sportType: formState.inputs.sportType.value,
        };
    const url = isLoginMode ? "players/login/" : "players/signup/";
    await api
      .post(url, body)
      .then((res) => {
        auth.login(res.data._id);
      })
      .catch((err) => {
        if (isLoginMode) {
          setShowFailed(true);
          setHeader("Failed to Login.");
          setMessage("Email or password incorrect please try again.");
        } else {
          setShowFailed(true);
          setHeader("Failed to Register.");
          setMessage("Email already used please try login instead.");
        }
      });
  };

  return (
    <Card className="authentication">
      <h2>{isLoginMode ? "Login" : "Register"}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD()]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        />
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Full Name"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(2),
              VALIDATOR_MAXLENGTH(30),
            ]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode && (
          <Input
            element="input"
            id="phone"
            type="text"
            label="Phone Number"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PHONE()]}
            errorText="Please enter a phone number."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode && (
          <Input
            element="dropbox"
            id="sportType"
            type="text"
            label="Prefered Sport"
            options={sports}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please select a prefered sport."
            onInput={inputHandler}
          />
        )}
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "REGISTER"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "REGISTER" : "LOGIN"}
      </Button>
      <Modal
        show={showFailed}
        onCancel={() => setShowFailed(false)}
        header={header}
        footer={
          <Button inverse onClick={() => setShowFailed(false)}>
            OK
          </Button>
        }
      >
        <p>{message}</p>
      </Modal>
    </Card>
  );
};

export default SignPage;
