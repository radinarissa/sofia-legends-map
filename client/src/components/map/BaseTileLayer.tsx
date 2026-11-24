import { TileLayer } from "react-leaflet";
import useThemeMode from "../../hooks/common/useThemeMode";

const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const TILES = {
  light: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: OSM_ATTRIBUTION,
  },
  night: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: `${OSM_ATTRIBUTION} &copy; <a href="https://carto.com/attributions">CARTO</a>`,
  },
};

export default function BaseTileLayer() {
  const { mode } = useThemeMode();
  const tiles = TILES[mode];
  return <TileLayer key={mode} url={tiles.url} attribution={tiles.attribution} />;
}