import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { LegendFilters, LegendSummary } from "../../types/legend";

function toQueryParams(filters: LegendFilters) {
  return {
    category: filters.category?.length ? filters.category.join(",") : undefined,
    era: filters.era?.length ? filters.era.join(",") : undefined,
    credibility: filters.credibility?.length ? filters.credibility.join(",") : undefined,
    district: filters.district || undefined,
    minScary: filters.minScary,
    maxScary: filters.maxScary,
    q: filters.q?.trim() || undefined,
    sort: filters.sort,
  };
}

async function getLegends(filters: LegendFilters): Promise<LegendSummary[]> {
  const { data } = await api.get<LegendSummary[]>("/legends", {
    params: toQueryParams(filters),
  });
  return data;
}

export default function useGetLegends(filters: LegendFilters = {}) {
  return useQuery({
    queryKey: ["legends", filters],
    queryFn: () => getLegends(filters),
    placeholderData: keepPreviousData,
  });
}