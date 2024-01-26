import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Button, Container, Paper, Typography } from "@mui/material";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_NAME,
  VALIDATOR_PASSWORD,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { AuthContext } from "../shared/context/auth-context";
import Service from "../shared/Service";

const SignPage = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [blurFields, setBlurFields] = useState({
    email: false,
    password: false,
    name: false,
    phone: false,
    sportType: false,
  });
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    sportType: "",
  });

  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Volleyball",
    "Footvolley",
  ];
  const isValid = isLoginMode
    ? VALIDATOR_EMAIL(authData.email) && VALIDATOR_PASSWORD(authData.password)
    : VALIDATOR_EMAIL(authData.email) &&
      VALIDATOR_PASSWORD(authData.password) &&
      VALIDATOR_NAME(authData.name) &&
      VALIDATOR_PHONE(authData.phone) &&
      VALIDATOR_REQUIRE(authData.sportType);

  const handleChangeMode = () => {
    setIsLoginMode((prev) => !prev);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const body = isLoginMode
      ? {
          email: authData.email.toLowerCase(),
          password: authData.password,
        }
      : {
          email: authData.email.toLowerCase(),
          password: authData.password,
          name: authData.name,
          phone: authData.phone,
          sportType: authData.sportType,
        };
    if (isLoginMode) {
      const res = await Service.Login(body);
      if (res.status === 200) {
        props.setAlertMessage(
          `Successfully logged in, Welcome ${res.data.name}`,
          false
        );
        auth.login(res.data._id);
      } else {
        props.setAlertMessage(res.data.error, true);
      }
    } else {
      const res = await Service.SignUp(body);
      if (res.status === 200) {
        props.setAlertMessage(
          `Successfully registered, Welcome ${res.data.name}`,
          false
        );
        auth.login(res._id);
      } else {
        props.setAlertMessage(res.data.error, true);
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ my: 15 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
        <Typography align='center' component='h1' variant='h4' marginBottom={3}>
          {isLoginMode ? "Login" : "Register"}
        </Typography>
        <Box component='form' noValidate onSubmit={authSubmitHandler}>
          <Grid container spacing={3} justifyContent='center'>
            <Grid item xs={12}>
              <TextField
                required
                id='email'
                name='email'
                label='Email'
                type='email'
                fullWidth
                variant='outlined'
                error={
                  authData.email !== "" &&
                  !VALIDATOR_EMAIL(authData.email) &&
                  blurFields.email
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, email: true }))
                }
                onChange={(e) => {
                  const newEmail = e.target.value;
                  setAuthData((perv) => ({ ...perv, email: newEmail }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='password'
                name='password'
                label='Password'
                type='password'
                fullWidth
                variant='outlined'
                error={
                  authData.password !== "" &&
                  !VALIDATOR_PASSWORD(authData.password) &&
                  blurFields.password
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, password: true }))
                }
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setAuthData((perv) => ({ ...perv, password: newPassword }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Collapse in={!isLoginMode}>
                <TextField
                  required
                  id='name'
                  name='name'
                  label='Full Name'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={
                    authData.name !== "" &&
                    !VALIDATOR_NAME(authData.name) &&
                    blurFields.name
                  }
                  onBlur={() =>
                    setBlurFields((perv) => ({ ...perv, name: true }))
                  }
                  onChange={(e) => {
                    const newName = e.target.value;
                    setAuthData((perv) => ({ ...perv, name: newName }));
                  }}
                />
              </Collapse>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={!isLoginMode}>
                <TextField
                  required
                  id='phone'
                  name='phone'
                  label='Phone Number'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={
                    authData.phone !== "" &&
                    !VALIDATOR_PHONE(authData.phone) &&
                    blurFields.phone
                  }
                  onBlur={() =>
                    setBlurFields((perv) => ({ ...perv, phone: true }))
                  }
                  onChange={(e) => {
                    const newPhone = e.target.value;
                    setAuthData((perv) => ({ ...perv, phone: newPhone }));
                  }}
                />
              </Collapse>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={!isLoginMode}>
                <TextField
                  fullWidth
                  select
                  label='Prefered Sport'
                  id='sportType'
                  name='sportType'
                  type='text'
                  variant='outlined'
                  value={authData.sportType}
                  error={
                    authData.sportType !== "" &&
                    !VALIDATOR_REQUIRE(authData.sportType) &&
                    blurFields.sportType
                  }
                  onBlur={() =>
                    setBlurFields((perv) => ({ ...perv, sportType: true }))
                  }
                  onChange={(e) => {
                    const newSportType = e.target.value;
                    setAuthData((perv) => ({
                      ...perv,
                      sportType: newSportType,
                    }));
                  }}
                >
                  {sports.map((option, key) => (
                    <MenuItem key={key} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                type='submit'
                variant='contained'
                sx={{ width: "100px" }}
                disabled={!isValid}
              >
                {isLoginMode ? "login" : "register"}
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button variant='outlined' onClick={handleChangeMode}>
                {isLoginMode ? "switch to register" : "switch to login"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignPage;
