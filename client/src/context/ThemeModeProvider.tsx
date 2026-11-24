import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeModeContext } from "./ThemeModeContext";
import type { ThemeModeContextValue } from "./ThemeModeContext";
import { createAppTheme } from "../theme";
import type { ThemeMode } from "../types/theme";

const STORAGE_KEY = "sofia-legends-theme";

function getInitialMode(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "night") return saved;
  } catch (error) {
    console.warn("Не може да се прочете темата", error);
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "light";
}

function saveMode(mode: ThemeMode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (error) {
    console.warn("Не може да се запази темата", error);
  }
}

export default function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const toggleMode = useCallback(() => {
    const next = mode === "night" ? "light" : "night";
    saveMode(next);
    setMode(next);
  }, [mode]);

  const muiTheme = useMemo(() => createAppTheme(mode), [mode]);
  const value = useMemo<ThemeModeContextValue>(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}