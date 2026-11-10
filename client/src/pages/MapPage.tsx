import { useState } from "react";
import type { LegendFilters } from "../types/legend";
import useGetLegends from "../hooks/legends/useGetLegends";
import LegendMap from "../components/map/LegendMap";
import LegendList from "../components/legends/LegendList";
import FilterPanel from "../components/filters/FilterPanel";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function MapPage() {
  const [filters, setFilters] = useState<LegendFilters>({});
  const { data: legends = [], isPending, isError, error, refetch } = useGetLegends(filters);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-semibold md:text-4xl">Карта на легендите</h1>
        <p className="mt-2 text-ink-muted">
          {isPending ? "Търсим легендите из града..." : `${legends.length} легенди из София и околностите`}
        </p>
      </header>

      <section className="ink-card p-4 md:p-5" aria-label="Филтри">
        <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters({})} />
      </section>

      {isPending && <Loader text="Зареждаме легендите..." />}

      {isError && (
        <ErrorMessage title="Не успяхме да заредим легендите" error={error} onRetry={() => refetch()} />
      )}

      {!isPending && !isError && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <LegendMap legends={legends} />
          <div className="lg:max-h-[560px] lg:overflow-y-auto lg:pr-2">
            <LegendList legends={legends} />
          </div>
        </div>
      )}
    </div>
  );
}