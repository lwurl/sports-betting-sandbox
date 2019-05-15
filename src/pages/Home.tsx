import React from "react";
import HeaderBar from "../components/HeaderBar";

interface Props {
  path: string;
}

function HomeScreen({ path }: Props) {
  return (
    <div>
      <HeaderBar />
      <p>This is the home screen</p>
    </div>
  );
}

export default HomeScreen;
