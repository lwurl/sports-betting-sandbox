import React from "react";
import HomeRouter from "./Router";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import app, { FirebaseContext } from "./components/Firebase";

const App: React.FC = () => {
  return (
    <FirebaseContext.Provider value={app}>
      <MuiThemeProvider theme={theme}>
        <HomeRouter />
      </MuiThemeProvider>
    </FirebaseContext.Provider>
  );
};

export default App;
