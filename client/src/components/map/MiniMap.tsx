import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { Category } from "../../types/legend";
import { categoryIcon } from "./categoryIcon";

interface MiniMapProps {
  lat: number;
  lng: number;
  title: string;
  category: Category;
}

export default function MiniMap({ lat, lng, title, category }: MiniMapProps) {
  return (
    <div className="overflow-hidden rounded-ink">
      <MapContainer center={[lat, lng]} zoom={16} scrollWheelZoom={false} className="h-56 w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={categoryIcon(category)} title={title} />
      </MapContainer>
    </div>
  );
}