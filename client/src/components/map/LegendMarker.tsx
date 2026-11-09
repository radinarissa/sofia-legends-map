import { Marker, Popup } from "react-leaflet";
import type { LegendSummary } from "../../types/legend";
import { legendIcon } from "./legendIcon";
import LegendPopup from "./LegendPopup";

interface LegendMarkerProps {
  legend: LegendSummary;
}

export default function LegendMarker({ legend }: LegendMarkerProps) {
  return (
    <Marker position={[legend.lat, legend.lng]} icon={legendIcon} title={legend.title}>
      <Popup>
        <LegendPopup legend={legend} />
      </Popup>
    </Marker>
  );
}