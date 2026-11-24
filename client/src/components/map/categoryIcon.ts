import L from "leaflet";
import type { Category } from "../../types/legend";
import { CATEGORY_ICON_PATHS } from "../../constants/categoryIcons";

const cache = new Map<Category, L.DivIcon>();

export function categoryIcon(category: Category): L.DivIcon {
  const cached = cache.get(category);
  if (cached) return cached;

  const icon = L.divIcon({
    className: "category-pin",
    html: `<span class="category-bg--${category}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${CATEGORY_ICON_PATHS[category]}"/></svg></span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });

  cache.set(category, icon);
  return icon;
}