import { Link } from "react-router";
import { Button, Chip } from "@mui/material";
import useGetDailyLegend from "../../hooks/legends/useGetDailyLegend";
import { CATEGORY_LABELS, ERA_LABELS } from "../../constants/labels";
import { splitDayMonth } from "../../utils/date";
import ScarinessDots from "../common/ScarinessDots";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function DailyLegend() {
  const { data, isPending, isError, error, refetch } = useGetDailyLegend();

  if (isPending) return <Loader text="Избираме легендата на деня..." />;
  if (isError) return <ErrorMessage title="Не успяхме да заредим легендата на деня" error={error} onRetry={() => refetch()} />;

  const { legend, date } = data;
  const { day, month } = splitDayMonth(date);

  return (
    <section aria-labelledby="daily-title" className="ink-card grid gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-8">
      {}
      <div className="flex flex-row items-baseline gap-3 md:flex-col md:items-center md:gap-0 md:border-r md:border-dashed md:border-ink-border md:pr-10">
        <span className="font-heading text-6xl font-semibold leading-none text-ink-accent md:text-8xl">{day}</span>
        <span className="text-lg text-ink-muted">{month}</span>
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <p className="m-0 text-sm font-semibold uppercase tracking-[0.18em] text-ink-muted">Легенда на деня</p>
        <h2 id="daily-title" className="m-0 text-3xl font-semibold md:text-4xl">
          {legend.title}
        </h2>
        <p className="m-0 text-lg text-ink-muted">{legend.shortDescription}</p>

        <div className="flex flex-wrap items-center gap-2">
          <Chip label={CATEGORY_LABELS[legend.category]} color="primary" size="small" />
          <Chip label={ERA_LABELS[legend.era]} variant="outlined" size="small" />
          <span className="text-sm text-ink-muted">{legend.district}</span>
          <ScarinessDots value={legend.scariness} />
        </div>

        <div className="pt-2">
          <Button component={Link} to={`/legends/${legend.slug}`} variant="contained">
            Прочети историята
          </Button>
        </div>
      </div>
    </section>
  );
}