import { useState } from "react";
import { Badge, Button, Drawer, LinearProgress, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TuneIcon from "@mui/icons-material/Tune";
import useGetLegends from "../hooks/legends/useGetLegends";
import useLegendFilters from "../hooks/legends/useLegendFilters";
import useDebounce from "../hooks/common/useDebounce";
import { countActiveFilters } from "../utils/filters";
import LegendMap from "../components/map/LegendMap";
import LegendList from "../components/legends/LegendList";
import FilterPanel from "../components/filters/FilterPanel";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function MapPage() {
  const { filters, setFilters, resetFilters } = useLegendFilters();

  const debouncedFilters = useDebounce(filters, 300);
  const { data: legends = [], isPending, isFetching, isError, error, refetch } = useGetLegends(debouncedFilters);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filterPanel = <FilterPanel filters={filters} onChange={setFilters} onReset={resetFilters} />;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold md:text-4xl">Карта на легендите</h1>
          <p className="mt-2 text-ink-muted">
            {isPending ? "Търсим легендите из града..." : `${legends.length} легенди из София и околностите`}
          </p>
        </div>

        {isMobile && (
          <Badge badgeContent={countActiveFilters(filters)} color="primary">
            <Button variant="outlined" startIcon={<TuneIcon />} onClick={() => setFiltersOpen(true)}>
              Филтри
            </Button>
          </Badge>
        )}
      </header>

      {isMobile ? (
        <Drawer
          anchor="bottom"
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          slotProps={{
            paper: { sx: { borderTopLeftRadius: 14, borderTopRightRadius: 14, maxHeight: "85vh" } },
          }}
        >
          <div className="flex flex-col gap-4 p-4 pb-6">
            <h2 className="m-0 text-xl font-semibold">Филтри</h2>
            {filterPanel}
            <Button variant="contained" fullWidth onClick={() => setFiltersOpen(false)}>
              Покажи {legends.length} легенди
            </Button>
          </div>
        </Drawer>
      ) : (
        <section className="ink-card p-4 md:p-5" aria-label="Филтри">
          {filterPanel}
        </section>
      )}

      {}
      <div className="-my-4 h-1">{isFetching && !isPending && <LinearProgress />}</div>

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