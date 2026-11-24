import { IconButton, Tooltip } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import useThemeMode from "../../hooks/common/useThemeMode";

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const isNight = mode === "night";
  const label = isNight ? "Включи дневен режим" : "Включи нощен режим";

  return (
    <Tooltip title={label}>
      <IconButton onClick={toggleMode} color="inherit" aria-label={label} aria-pressed={isNight}>
        {isNight ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}