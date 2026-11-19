import type { LegendSummary } from "./legend";

export type TravelMode = "walking" | "transit";

export type RouteStop = Pick<
  LegendSummary,
  "_id" | "slug" | "title" | "lat" | "lng" | "category" | "district" | "scariness"
>;

interface NightWalkBase {
  _id: string;
  slug: string;
  title: string;
  description: string;
  travelMode: TravelMode;
  durationMinutes: number;
  bestTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NightWalkSummary extends NightWalkBase {
  legends: RouteStop[];
}

export interface NightWalk extends NightWalkBase {
  legends: LegendSummary[];
}