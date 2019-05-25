import React from "react";
import { Router } from "@reach/router";
import Wager from "./pages/Wager";
import SecondScreen from "./pages/SecondScreen";

function HomeRouter() {
  return (
    <Router>
      <Wager path="/" />
      <SecondScreen path="dashboard" />
    </Router>
  );
}

export default HomeRouter;
