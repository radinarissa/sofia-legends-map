import L from "leaflet";

export const legendIcon = L.divIcon({
  className: "legend-pin",
  html: "<span></span>",
  iconSize: [24, 24],
  iconAnchor: [12, 12], 
  popupAnchor: [0, -14], 
});