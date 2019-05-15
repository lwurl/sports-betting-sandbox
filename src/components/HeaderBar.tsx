import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";

import styled from "styled-components";

function HeaderBar(props: WithStyles) {
  const { classes } = props;

  return (
    <HorizontalExpander>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.appTitle}>
            Sports Betting Sandbox
          </Typography>
          <Button className={classes.headerButton}>Leaderboard</Button>
          <Button className={classes.headerButton}>Wager</Button>
          <Avatar className={classes.avatar}>LW</Avatar>
        </Toolbar>
      </AppBar>
    </HorizontalExpander>
  );
}

const HorizontalExpander = styled.div`
  flexgrow: 1;
`;

const styles = createStyles({
  appTitle: {
    flex: 1
  },
  headerButton: {
    color: "white"
  },
  avatar: {
    margin: 10
  }
});

export default withStyles(styles)(HeaderBar);
