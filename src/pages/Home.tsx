import React, { useContext } from "react";
import HeaderBar from "../components/HeaderBar";
import { FirebaseContext } from "../components/Firebase";
import { AvailableSports } from "./types";

interface Props {
  path: string;
}

const HomeScreen = ({ path }: Props) => {
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

  return (
    <div>
      <HeaderBar />
      <p>This is the home screen</p>
      <button disabled={true} onClick={() => addToFirebase()}>
        Populate Firebase
      </button>
    </div>
  );
};

export default HomeScreen;
