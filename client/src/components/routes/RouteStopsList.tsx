import { Link } from "react-router";
import type { LegendSummary } from "../../types/legend";
import { distanceKm, formatKm } from "../../utils/geo";

interface RouteStopsListProps {
  stops: LegendSummary[];
}

export default function RouteStopsList({ stops }: RouteStopsListProps) {
  return (
    <ol className="m-0 flex list-none flex-col gap-3 p-0">
      {stops.map((stop, index) => (
        <li key={stop._id} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-accent text-sm font-bold text-white"
          >
            {index + 1}
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="h-4 text-xs text-ink-muted">
              {index > 0 && `${formatKm(distanceKm(stops[index - 1], stop))} от предишната спирка`}
            </span>
            <Link to={`/legends/${stop.slug}`} className="ink-card block p-3 text-ink-text no-underline hover:shadow-md">
              <span className="block font-heading font-semibold">{stop.title}</span>
              <span className="block text-sm text-ink-muted">{stop.address}</span>
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}