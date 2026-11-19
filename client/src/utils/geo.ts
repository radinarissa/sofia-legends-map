export interface LatLngPoint {
  lat: number;
  lng: number;
}

const EARTH_RADIUS_KM = 6371;
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export function distanceKm(a: LatLngPoint, b: LatLngPoint): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export function routeDistanceKm(points: LatLngPoint[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += distanceKm(points[i - 1], points[i]);
  }
  return total;
}

export function formatKm(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} м`;
  return `${km.toFixed(1).replace(".", ",")} км`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} мин`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} ч` : `${hours} ч ${rest} мин`;
}

export function directionsUrl(points: LatLngPoint[], mode: "walking" | "transit"): string {
  const format = (point: LatLngPoint) => `${point.lat},${point.lng}`;
  const params = new URLSearchParams({
    api: "1",
    origin: format(points[0]),
    destination: format(points[points.length - 1]),
    travelmode: mode,
  });

  const middle = points.slice(1, -1);
  if (mode === "walking" && middle.length > 0) {
    params.set("waypoints", middle.map(format).join("|"));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}