import type { LegendFilters } from "../types/legend";

export function countActiveFilters(filters: LegendFilters): number {
  let count = 0;
  if (filters.category?.length) count++;
  if (filters.era?.length) count++;
  if (filters.credibility?.length) count++;
  if (filters.district) count++;
  if (filters.minScary !== undefined || filters.maxScary !== undefined) count++;
  if (filters.q?.trim()) count++;
  return count;
}