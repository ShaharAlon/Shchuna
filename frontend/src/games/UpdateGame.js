import React, { useContext, useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Service from "../shared/Service";

const UpdateGame = (props) => {
  const cities = require("../shared/Cities");
  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Volleyball",
    "Footvolley",
  ];
  const gameID = useParams().gameID;
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [blurFields, setBlurFields] = useState({
    place: false,
    city: false,
    time: false,
    availableSpots: false,
    sportType: false,
  });
  const [gameData, setGameData] = useState({
    place: "",
    city: "",
    time: dayjs().add(1, "hour"),
    availableSpots: "",
    sportType: "",
  });

  useEffect(() => {
    const setGame = async () => {
      const res = await Service.getGame(gameID);
      if (res._id) {
        setGameData({
          place: res.place,
          city: res.city,
          time: dayjs(res.time),
          availableSpots: res.availableSpots,
          sportType: res.sportType,
        });
      }
    };
    setGame();
  }, [setGameData, gameID]);

  const isValid =
    VALIDATOR_NAME(gameData.place) &&
    VALIDATOR_REQUIRE(gameData.city) &&
    VALIDATOR_REQUIRE(gameData.time) &&
    VALIDATOR_REQUIRE(gameData.availableSpots) &&
    VALIDATOR_REQUIRE(gameData.sportType);

  const GameSubmitHandler = async (event) => {
    event.preventDefault();
    const body = {
      _id: auth.loggedUser,
      place: gameData.place,
      city: gameData.city,
      sportType: gameData.sportType,
      time: gameData.time,
      availableSpots: gameData.availableSpots,
    };
    const res = await Service.updateGame(gameID, body);
    if (res.status === 200) {
      props.setAlertMessage(
        `Successfully updated your game in ${res.data.place}`,
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
          Update Game
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
                value={gameData.place}
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
                id='availableSpots'
                name='availableSpots'
                label='Available Spots'
                type='number'
                fullWidth
                variant='outlined'
                value={gameData.availableSpots}
                error={
                  gameData.availableSpots !== "" &&
                  !VALIDATOR_REQUIRE(gameData.availableSpots) &&
                  blurFields.availableSpots
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, availableSpots: true }))
                }
                onChange={(e) => {
                  const newAvailableSpots = e.target.value;
                  setGameData((perv) => ({
                    ...perv,
                    availableSpots: newAvailableSpots,
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

export default UpdateGame;
