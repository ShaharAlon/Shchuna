import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Button, Container, Paper, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AuthContext } from "../shared/context/auth-context";
import { VALIDATOR_NAME, VALIDATOR_REQUIRE } from "../shared/util/validators";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Service from "../shared/Service";

const AddGamePage = (props) => {
  const cities = require("../shared/Cities");
  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Volleyball",
    "Footvolley",
  ];
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [blurFields, setBlurFields] = useState({
    place: false,
    city: false,
    time: false,
    totalSpots: false,
    sportType: false,
  });
  const [gameData, setGameData] = useState({
    place: "",
    city: "",
    time: dayjs().add(1, "hour"),
    totalSpots: "",
    sportType: "",
  });

  const isValid =
    VALIDATOR_NAME(gameData.place) &&
    VALIDATOR_REQUIRE(gameData.city) &&
    VALIDATOR_REQUIRE(gameData.time) &&
    VALIDATOR_REQUIRE(gameData.totalSpots) &&
    VALIDATOR_REQUIRE(gameData.sportType);

  const GameSubmitHandler = async (event) => {
    event.preventDefault();
    const body = {
      _id: auth.loggedUser,
      place: gameData.place,
      city: gameData.city,
      sportType: gameData.sportType,
      time: gameData.time,
      totalSpots: gameData.totalSpots,
    };
    const res = await Service.addGame(body);
    if (res.status === 200) {
      props.setAlertMessage(
        `Successfully created your game in ${res.data.place}`,
        false
      );
      history.push("/");
    } else {
      props.setAlertMessage(res.data.error, true);
    }
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ my: 15 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
        <Typography align='center' component='h1' variant='h4' marginBottom={3}>
          Add Game
        </Typography>
        <Box component='form' noValidate onSubmit={GameSubmitHandler}>
          <Grid container spacing={3} justifyContent='center'>
            <Grid item xs={12}>
              <TextField
                required
                id='place'
                name='place'
                label='Place'
                type='text'
                fullWidth
                variant='outlined'
                error={
                  gameData.place !== "" &&
                  !VALIDATOR_NAME(gameData.place) &&
                  blurFields.place
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, place: true }))
                }
                onChange={(e) => {
                  const newPlace = e.target.value;
                  setGameData((perv) => ({ ...perv, place: newPlace }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label='City'
                id='city'
                name='city'
                type='text'
                variant='outlined'
                value={gameData.city}
                error={
                  gameData.city !== "" &&
                  !VALIDATOR_REQUIRE(gameData.city) &&
                  blurFields.city
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, city: true }))
                }
                onChange={(e) => {
                  const newCity = e.target.value;
                  setGameData((perv) => ({
                    ...perv,
                    city: newCity,
                  }));
                }}
              >
                {cities.map((option, key) => (
                  <MenuItem key={key} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label='Prefered Sport'
                id='sportType'
                name='sportType'
                type='text'
                variant='outlined'
                value={gameData.sportType}
                error={
                  gameData.sportType !== "" &&
                  !VALIDATOR_REQUIRE(gameData.sportType) &&
                  blurFields.sportType
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, sportType: true }))
                }
                onChange={(e) => {
                  const newSportType = e.target.value;
                  setGameData((perv) => ({
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='totalSpots'
                name='totalSpots'
                label='Total Spots'
                type='number'
                fullWidth
                variant='outlined'
                error={
                  gameData.totalSpots !== "" &&
                  !VALIDATOR_REQUIRE(gameData.totalSpots) &&
                  blurFields.totalSpots
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, totalSpots: true }))
                }
                onChange={(e) => {
                  const newTotalSpots = e.target.value;
                  setGameData((perv) => ({
                    ...perv,
                    totalSpots: newTotalSpots,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='en-gb'
              >
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label='Game Time'
                    value={gameData.time}
                    disablePast={true}
                    onChange={(newTime) => {
                      setGameData((perv) => ({
                        ...perv,
                        time: newTime,
                      }));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                type='submit'
                variant='contained'
                sx={{ width: "100px" }}
                disabled={!isValid}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddGamePage;
