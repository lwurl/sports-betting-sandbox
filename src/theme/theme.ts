import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#018499"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Quicksand", "sans-serif"].join(",")
  }
});

export default theme;
