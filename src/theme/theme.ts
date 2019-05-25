import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#481620"
    },
    secondary: {
      main: "#00ffc5"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Quicksand", "sans-serif"].join(",")
  }
});

export default theme;
