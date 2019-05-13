import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import SecondScreen from "./SecondScreen";

function HomeRouter() {
  return (
    <Router>
      <Home path="/" />
      <SecondScreen path="dashboard" />
    </Router>
  );
}

export default HomeRouter;
