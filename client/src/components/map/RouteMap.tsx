import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import type { LegendSummary } from "../../types/legend";
import { numberIcon } from "./numberIcon";
import LegendPopup from "./LegendPopup";

interface RouteMapProps {
  stops: LegendSummary[]; 
}

export default function RouteMap({ stops }: RouteMapProps) {
  const positions = stops.map((stop): [number, number] => [stop.lat, stop.lng]);

  return (
    <div className="ink-card overflow-hidden">
      {}
      <MapContainer
        bounds={positions}
        boundsOptions={{ padding: [40, 40] }}
        scrollWheelZoom
        className="h-[60vh] w-full md:h-[560px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {}
        <Polyline positions={positions} pathOptions={{ className: "route-line", weight: 4, dashArray: "8 10" }} />

        {stops.map((stop, index) => (
          <Marker key={stop._id} position={[stop.lat, stop.lng]} icon={numberIcon(index + 1)} title={stop.title}>
            <Popup>
              <LegendPopup legend={stop} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}