import React from "react";
import { Router } from "@reach/router";
import Home from "./pages/Home";
import SecondScreen from "./pages/SecondScreen";

function HomeRouter() {
  return (
    <Router>
      <Home path="/" />
      <SecondScreen path="dashboard" />
    </Router>
  );
}

export default HomeRouter;
