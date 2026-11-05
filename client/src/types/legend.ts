export type Category = "ghosts" | "tunnels" | "curses" | "mysteries" | "myths";
export type Era = "ancient" | "medieval" | "ottoman" | "kingdom" | "socialism" | "modern";
export type Credibility = "confirmed" | "partial" | "legend";
export type LegendStatus = "pending" | "approved" | "rejected";
export type SortOption = "title" | "-title" | "scariness" | "-scariness" | "newest";

export interface Source {
  title: string;
  url: string;
}

export interface LegendImage {
  url: string;
  author?: string;
  license?: string;
}

export interface LegendSummary {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  address: string;
  district: string;
  lat: number;
  lng: number;
  category: Category;
  era: Era;
  scariness: number;
  credibility: Credibility;
  images: LegendImage[];
  status: LegendStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Legend extends LegendSummary {
  fullStory: string;
  sources: Source[];
}

export interface LegendFilters {
  category?: Category[];
  era?: Era[];
  credibility?: Credibility[];
  district?: string;
  minScary?: number;
  maxScary?: number;
  q?: string;
  sort?: SortOption;
}