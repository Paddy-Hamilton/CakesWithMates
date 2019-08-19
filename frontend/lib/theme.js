import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import teal from "@material-ui/core/colors/teal";
import green from "@material-ui/core/colors/green";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700]
    },
    secondary: {
      xlight: teal["A100"],
      light: teal["A200"],
      main: teal["A400"],
      dark: teal["A700"]
    },
    success: green["600"]
  }
});