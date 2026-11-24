import { MapContainer, Marker} from "react-leaflet";
import type { Category } from "../../types/legend";
import { categoryIcon } from "./categoryIcon";
import BaseTileLayer from "./BaseTileLayer";

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
        <BaseTileLayer />
        <Marker position={[lat, lng]} icon={categoryIcon(category)} title={title} />
      </MapContainer>
    </div>
  );
}