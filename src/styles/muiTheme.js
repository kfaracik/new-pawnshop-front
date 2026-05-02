import { createTheme } from "@mui/material/styles";
import colors from "styles/colors";
import tokens from "design-system/tokens";

const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
      contrastText: colors.primaryContrastText,
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
      contrastText: colors.secondaryContrastText,
    },
    success: { main: colors.success },
    warning: { main: colors.warning },
    error: { main: colors.error },
    info: { main: colors.info },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    background: {
      default: colors.backgroundDefault,
      paper: colors.backgroundPaper,
    },
    divider: "#E0E0E0",
  },
  shape: { borderRadius: tokens.radius.md },
  typography: {
    fontFamily: tokens.typography.fontFamily,
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.backgroundDefault,
          color: colors.textPrimary,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #ECECEC",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.backgroundDark,
          color: colors.textInverse,
        },
      },
    },
  },
});

export default muiTheme;
