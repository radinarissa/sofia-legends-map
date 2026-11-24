import { useContext } from "react";
import { ThemeModeContext } from "../../context/ThemeModeContext";

export default function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode трябва да се ползва вътре в ThemeModeProvider");
  }
  return context;
}