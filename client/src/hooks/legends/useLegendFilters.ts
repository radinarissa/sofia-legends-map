import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { Category, Credibility, Era, LegendFilters, SortOption } from "../../types/legend";
import { CATEGORY_LABELS, CREDIBILITY_LABELS, ERA_LABELS, SORT_LABELS } from "../../constants/labels";

function readList<T extends string>(raw: string | null, allowed: Record<T, string>): T[] | undefined {
  if (!raw) return undefined;
  const values = raw.split(",").filter((value): value is T => Object.hasOwn(allowed, value));
  return values.length > 0 ? values : undefined;
}

function readScariness(raw: string | null): number | undefined {
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isInteger(value) && value >= 1 && value <= 5 ? value : undefined;
}

export default function useLegendFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<LegendFilters>(() => {
    const sort = searchParams.get("sort");
    return {
      category: readList<Category>(searchParams.get("category"), CATEGORY_LABELS),
      era: readList<Era>(searchParams.get("era"), ERA_LABELS),
      credibility: readList<Credibility>(searchParams.get("credibility"), CREDIBILITY_LABELS),
      district: searchParams.get("district") ?? undefined,
      minScary: readScariness(searchParams.get("minScary")),
      maxScary: readScariness(searchParams.get("maxScary")),
      q: searchParams.get("q") ?? undefined,
      sort: sort && Object.hasOwn(SORT_LABELS, sort) ? (sort as SortOption) : undefined,
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (next: LegendFilters) => {
      const params = new URLSearchParams();
      if (next.category?.length) params.set("category", next.category.join(","));
      if (next.era?.length) params.set("era", next.era.join(","));
      if (next.credibility?.length) params.set("credibility", next.credibility.join(","));
      if (next.district) params.set("district", next.district);
      if (next.minScary !== undefined) params.set("minScary", String(next.minScary));
      if (next.maxScary !== undefined) params.set("maxScary", String(next.maxScary));
      if (next.q) params.set("q", next.q);
      if (next.sort) params.set("sort", next.sort);
      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams]);

  return { filters, setFilters, resetFilters };
}