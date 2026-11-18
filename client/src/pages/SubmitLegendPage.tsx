import { useState } from "react";
import LocationPicker from "../components/map/LocationPicker";
import type { LatLng } from "../components/map/LocationPicker";

export default function SubmitLegendPage() {
  const [location, setLocation] = useState<LatLng | null>(null);
  return (
    <div className="mx-auto max-w-3xl">
      <LocationPicker value={location} onChange={setLocation} />
    </div>
  );
}