import { createTheme } from "@mui/material/styles";

const headingFont = '"Fraunces", Georgia, serif';

export const theme = createTheme({
  palette: {
    primary: { main: "#E07A5F", dark: "#c9654b", contrastText: "#ffffff" },
    text: { primary: "#1d2433", secondary: "#5b6475" },
  },
  typography: {
    fontFamily: '"Source Sans 3", system-ui, sans-serif',
    h1: { fontFamily: headingFont, fontWeight: 600 },
    h2: { fontFamily: headingFont, fontWeight: 600 },
    h3: { fontFamily: headingFont, fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          borderBottom: "2px dashed #E07A5F",
        },
      },
    },
  },
});