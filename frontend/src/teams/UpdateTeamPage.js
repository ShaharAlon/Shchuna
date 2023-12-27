import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Button, Container, Paper, Typography } from "@mui/material";
import { AuthContext } from "../shared/context/auth-context";
import { VALIDATOR_NAME, VALIDATOR_REQUIRE } from "../shared/util/validators";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Service from "../shared/Service";

const UpdateTeamPage = (props) => {
  const cities = require("../shared/Cities");
  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Volleyball",
    "Footvolley",
  ];
  const teamID = useParams().teamID;
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [blurFields, setBlurFields] = useState({
    name: false,
    city: false,
    sportType: false,
  });

  const [teamData, setTeamData] = useState({
    name: "",
    city: "",
    sportType: "",
  });
  const isValid =
    VALIDATOR_NAME(teamData.name) &&
    VALIDATOR_REQUIRE(teamData.city) &&
    VALIDATOR_REQUIRE(teamData.sportType);

  useEffect(() => {
    const setTeam = async () => {
      const res = await Service.getTeam(teamID);
      if (res._id) {
        setTeamData({
          name: res.name,
          city: res.city,
          sportType: res.sportType,
        });
      }
    };
    setTeam();
  }, [setTeamData, teamID]);

  const TeamSubmitHandler = async (event) => {
    event.preventDefault();
    const body = {
      _id: auth.loggedUser,
      name: teamData.name,
      city: teamData.city,
      sportType: teamData.sportType,
    };
    const res = await Service.updateTeam(teamID, body);
    if (res.status === 200) {
      props.setAlertMessage(
        `Successfully updated your team "${res.data.name}"`,
        false
      );
      history.push("/teams");
    } else {
      props.setAlertMessage(res.data.error, true);
    }
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ my: 15 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
        <Typography align='center' component='h1' variant='h4' marginBottom={3}>
          Update Team
        </Typography>
        <Box component='form' noValidate onSubmit={TeamSubmitHandler}>
          <Grid container spacing={3} justifyContent='center'>
            <Grid item xs={12}>
              <TextField
                required
                id='name'
                name='name'
                label='Team Name'
                type='text'
                fullWidth
                variant='outlined'
                value={teamData.name}
                error={
                  teamData.name !== "" &&
                  !VALIDATOR_NAME(teamData.name) &&
                  blurFields.name
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, name: true }))
                }
                onChange={(e) => {
                  const newName = e.target.value;
                  setTeamData((perv) => ({ ...perv, name: newName }));
                }}
              />
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
                value={teamData.sportType}
                error={
                  teamData.sportType !== "" &&
                  !VALIDATOR_REQUIRE(teamData.sportType) &&
                  blurFields.sportType
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, sportType: true }))
                }
                onChange={(e) => {
                  const newSportType = e.target.value;
                  setTeamData((perv) => ({
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
                fullWidth
                select
                label='City'
                id='city'
                name='city'
                type='text'
                variant='outlined'
                value={teamData.city}
                error={
                  teamData.city !== "" &&
                  !VALIDATOR_REQUIRE(teamData.city) &&
                  blurFields.city
                }
                onBlur={() =>
                  setBlurFields((perv) => ({ ...perv, city: true }))
                }
                onChange={(e) => {
                  const newCity = e.target.value;
                  setTeamData((perv) => ({
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

export default UpdateTeamPage;
