import { MapContainer, TileLayer } from "react-leaflet";
import type { LegendSummary } from "../../types/legend";

const SOFIA_CENTER: [number, number] = [42.6977, 23.3219];

interface LegendMapProps {
  legends: LegendSummary[];
}

export default function LegendMap({ legends }: LegendMapProps) {
  return (
    <div className="ink-card overflow-hidden">
      {}
      <MapContainer center={SOFIA_CENTER} zoom={12} scrollWheelZoom className="h-[60vh] w-full md:h-[560px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {}
        {legends.length === 0 && null}
      </MapContainer>
    </div>
  );
}