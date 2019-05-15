import React from "react";
import HomeRouter from "./Router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#018499"
    }
  },
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(",")
  }
});

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <HomeRouter />
    </MuiThemeProvider>
  );
};

export default App;
