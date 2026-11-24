import { createTheme } from "@mui/material/styles";
import type { ThemeMode } from "./types/theme";

const headingFont = '"Fraunces", Georgia, serif';

export function createAppTheme(mode: ThemeMode) {
  const isNight = mode === "night";

  return createTheme({
    palette: {
      mode: isNight ? "dark" : "light",
      primary: { main: "#E07A5F", dark: "#c9654b", contrastText: "#ffffff" },
      text: isNight
        ? { primary: "#e8ecf4", secondary: "#a3adc2" }
        : { primary: "#1d2433", secondary: "#5b6475" },
      background: isNight
        ? { default: "#0f1626", paper: "#18223a" }
        : { default: "#ffffff", paper: "#ffffff" },
      divider: isNight ? "#2e3b57" : "#d6dfec",
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
}