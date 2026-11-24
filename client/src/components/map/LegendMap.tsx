import {MapContainer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { LegendSummary } from "../../types/legend";
import LegendMarker from "./LegendMarker";
import MapKey from "./MapKey";
import { createClusterIcon } from "./clusterIcon";
import BaseTileLayer from "./BaseTileLayer";

const SOFIA_CENTER: [number, number] = [42.6977, 23.3219];

interface LegendMapProps {
  legends: LegendSummary[];
}

export default function LegendMap({ legends }: LegendMapProps) {
  return (
    <div className="ink-card overflow-hidden">
      <MapContainer center={SOFIA_CENTER} zoom={12} scrollWheelZoom className="h-[60vh] w-full md:h-[520px]">
        <BaseTileLayer />
        {}
        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          maxClusterRadius={50}
          iconCreateFunction={createClusterIcon}
        >
          {legends.map((legend) => (
            <LegendMarker key={legend._id} legend={legend} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <MapKey />
    </div>
  );
}