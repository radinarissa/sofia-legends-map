import { Marker, Popup } from "react-leaflet";
import type { LegendSummary } from "../../types/legend";
import { categoryIcon } from "./categoryIcon";
import LegendPopup from "./LegendPopup";

interface LegendMarkerProps {
  legend: LegendSummary;
}

export default function LegendMarker({ legend }: LegendMarkerProps) {
  return (
    <Marker position={[legend.lat, legend.lng]} icon={categoryIcon(legend.category)} title={legend.title}>
      <Popup>
        <LegendPopup legend={legend} />
      </Popup>
    </Marker>
  );
}