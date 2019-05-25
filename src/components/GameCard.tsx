import React from "react";
import BOS from "../logos/3/BOS.png";
import MIL from "../logos/3/MIL.png";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

function GameCard(props: WithStyles) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            spacing={0}
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs={4} className={classes.gridContainer}>
              <div className={classes.innerGridDiv}>
                <div className={classes.teamInfo}>
                  <img src={BOS} alt="BOS" width={100} height={100} />
                  <h1>BOS</h1>
                  <p>Red Sox</p>
                </div>
                <div>
                  <h3>+130</h3>
                  <Button variant="contained" color="secondary">
                    BET
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={4} className={classes.gridContainer}>
              <h1>@</h1>
            </Grid>
            <Grid item xs={4} className={classes.gridContainer}>
              <div className={classes.innerGridDiv}>
                <div className={classes.teamInfo}>
                  <img src={MIL} alt="MIL" width={100} height={100} />
                  <h1>MIL</h1>
                  <p>Brewers</p>
                </div>
                <div>
                  <h3>-130</h3>
                  <Button variant="contained" color="secondary">
                    BET
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className={classes.innerGridDiv}>
            <h3>7:30 PM</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const styles = createStyles({
  card: {
    minWidth: 275,
    maxWidth: 500,
    position: "relative",
    height: 380,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "1px"
  },
  gridContainer: {
    display: "flex",
    justifyContent: "space-around"
  },
  innerGridDiv: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  teamInfo: {
    lineHeight: "80%"
  }
});

export default withStyles(styles)(GameCard);
