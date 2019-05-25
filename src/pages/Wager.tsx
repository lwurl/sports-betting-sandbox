import React, { useContext } from "react";
import HeaderBar from "../components/HeaderBar";
import { FirebaseContext } from "../components/Firebase";
import { AvailableSports } from "./types";
import GameCard from "../components/GameCard";

import withWidth, { WithWidth } from "@material-ui/core/withWidth";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";

interface Props extends WithWidth {
  path: string;
}

interface ColsByWidth {
  [key: string]: number;
}

const WagerScreen = ({ width }: Props) => {
  const firebase = useContext(FirebaseContext);

  const getSports = (): Promise<AvailableSports> => {
    return fetch("https://therundown-therundown-v1.p.rapidapi.com/sports", {
      headers: {
        "X-RapidAPI-Host": "therundown-therundown-v1.p.rapidapi.com",
        "X-RapidAPI-Key": `${process.env.REACT_APP_X_RAPIDAPI_KEY}`
      }
    })
      .then(response => {
        if (response.status !== 200) return undefined;

        const date = new Date();
        const time = date.getTime();
        firebase
          .database()
          .ref("odds/")
          .update({ last_updated: time });

        return response.json();
      })
      .then((responseJson: AvailableSports) => {
        responseJson.sports.forEach(sport => {
          firebase
            .database()
            .ref(`odds/sports/${sport.sport_id}`)
            .update({ ...sport });
        });

        return responseJson;
      });
  };

  const addToFirebase = async () => {
    // check to see if the database needs to be updated or not
    // the database is only updated every so often becuase of the API call quota
    // let odds_last_updated: number;
    const odds_last_updated: number = await firebase
      .database()
      .ref("/odds/")
      .once("value")
      .then(snapshot => {
        return (snapshot.val() && snapshot.val().last_updated) || 0;
      });
    const date = new Date();
    const current_time = date.getTime();
    console.log("here");
    console.log(current_time);
    console.log(odds_last_updated);
    // if the odds have been updated recently enough then do not update
    if (current_time - odds_last_updated < 9600000) return;
    console.log(odds_last_updated);

    // grab the sports that the API contains
    const availableSports = await getSports();
    availableSports.sports.forEach(sport => {
      // get the date in yyyy-mm-dd format
      const d = new Date();
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      const formattedDate = [year, month, day].join("-");
      // fetch the games for each sport
      fetch(
        `https://therundown-therundown-v1.p.rapidapi.com/sports/${
          sport.sport_id
        }/events/${formattedDate}?include=all_periods%2C+scores%2C+and%2For+teams&offset=240`,
        {
          headers: {
            "X-RapidAPI-Host": "therundown-therundown-v1.p.rapidapi.com",
            "X-RapidAPI-Key": `${process.env.REACT_APP_X_RAPIDAPI_KEY}`
          }
        }
      )
        .then(response => {
          if (response.status !== 200) return undefined;
          return response.json();
        })
        .then(responseJson => {
          firebase
            .database()
            .ref(`/odds/games/${sport.sport_id}`)
            .update({ ...responseJson });
          firebase
            .database()
            .ref(`/odds/sports/${sport.sport_id}`)
            .update({ games_today: responseJson.events.length });
        });
    });
  };

  const colsByWidth: ColsByWidth = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3
  };

  return (
    <div>
      <HeaderBar />
      <p>{width}</p>
      <Grid container spacing={0}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <GridList cols={colsByWidth[width]} cellHeight={450}>
            <GridListTile>
              <GameCard />
            </GridListTile>
            <GridListTile>
              <GameCard />
            </GridListTile>
            <GridListTile>
              <GameCard />
            </GridListTile>
            <GridListTile>
              <GameCard />
            </GridListTile>
            <GridListTile>
              <GameCard />
            </GridListTile>
            <GridListTile>
              <GameCard />
            </GridListTile>
            <GridListTile>
              <GameCard />
            </GridListTile>
            <GridListTile>
              <GameCard />
            </GridListTile>
          </GridList>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <button disabled={false} onClick={() => addToFirebase()}>
        Populate Firebase
      </button>
    </div>
  );
};

export default withWidth()(WagerScreen);
