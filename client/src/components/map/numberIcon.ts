import L from "leaflet";

export function numberIcon(number: number) {
  return L.divIcon({
    className: "route-pin",
    html: `<span>${number}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -16],
  });
}