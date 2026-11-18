import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { legendIcon } from "./legendIcon";

export interface LatLng {
  lat: number;
  lng: number;
}

const SOFIA_CENTER: [number, number] = [42.6977, 23.3219];
const SOFIA_BOUNDS: [[number, number], [number, number]] = [
  [42.4, 23.1],
  [42.85, 23.55],
];

const round = (value: number) => Math.round(value * 1e6) / 1e6;

function ClickHandler({ onPick }: { onPick: (value: LatLng) => void }) {
  useMapEvents({
    click: (event) => onPick({ lat: round(event.latlng.lat), lng: round(event.latlng.lng) }),
  });
  return null;
}

interface LocationPickerProps {
  value: LatLng | null;
  onChange: (value: LatLng) => void;
  error?: string;
}

export default function LocationPicker({ value, onChange, error }: LocationPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold">Място на картата</span>
      <p className="m-0 text-sm text-ink-muted">Кликнете върху картата, за да отбележите къде се разказва легендата.</p>

      <div className={`overflow-hidden rounded-ink border-2 ${error ? "border-red-600" : "border-ink-border"}`}>
        <MapContainer
          center={value ? [value.lat, value.lng] : SOFIA_CENTER}
          zoom={value ? 16 : 12}
          minZoom={10}
          maxBounds={SOFIA_BOUNDS}
          maxBoundsViscosity={1}
          className="h-72 w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onPick={onChange} />
          {value && <Marker position={[value.lat, value.lng]} icon={legendIcon} />}
        </MapContainer>
      </div>

      <p className={`m-0 text-sm ${error ? "text-red-700" : "text-ink-muted"}`}>
        {error ?? (value ? `Избрано място: ${value.lat}, ${value.lng}` : "Още не е избрано място")}
      </p>
    </div>
  );
}