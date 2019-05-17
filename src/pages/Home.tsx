import React, { useContext } from "react";
import HeaderBar from "../components/HeaderBar";
import { FirebaseContext } from "../components/Firebase";

interface Props {
  path: string;
}

const HomeScreen = ({ path }: Props) => {
  const firebase = useContext(FirebaseContext);

  const addToFirebase = (something: any) => {
    const rootRef = firebase.database().ref("/");
    const date = new Date();
    const sec = date.getTime();
    rootRef.push(sec);
    return something;
  };

  return (
    <div>
      <HeaderBar />
      <p>This is the home screen</p>
      <button onClick={() => addToFirebase("This little string")}>Hi</button>
    </div>
  );
};

export default HomeScreen;
