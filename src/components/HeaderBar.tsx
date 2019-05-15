import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

function HeaderBar() {
  return (
    <HorizontalExpander>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Sports Betting Sandbox
          </Typography>
        </Toolbar>
      </AppBar>
    </HorizontalExpander>
  );
}

const HorizontalExpander = styled.div`
  flexgrow: 1;
`;

export default HeaderBar;
