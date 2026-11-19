import { Link } from "react-router";
import { Card, CardActionArea, CardContent, Chip } from "@mui/material";
import type { NightWalkSummary } from "../../types/route";
import { TRAVEL_MODE_LABELS } from "../../constants/labels";
import { formatDuration, formatKm, routeDistanceKm } from "../../utils/geo";

interface RouteCardProps {
  walk: NightWalkSummary;
}

export default function RouteCard({ walk }: RouteCardProps) {
  const distance = routeDistanceKm(walk.legends);

  return (
    <Card variant="outlined" className="h-full">
      <CardActionArea component={Link} to={`/routes/${walk.slug}`} className="flex h-full flex-col items-stretch">
        <CardContent className="flex h-full flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            <Chip label={TRAVEL_MODE_LABELS[walk.travelMode]} size="small" color="primary" />
            <Chip label={formatDuration(walk.durationMinutes)} size="small" variant="outlined" />
            <Chip label={`${walk.legends.length} спирки`} size="small" variant="outlined" />
            <Chip label={formatKm(distance)} size="small" variant="outlined" />
          </div>

          <h2 className="m-0 text-xl font-semibold leading-snug">{walk.title}</h2>
          <p className="m-0 line-clamp-3 text-ink-muted">{walk.description}</p>

          {}
          <p className="m-0 mt-auto text-sm">
            <span className="text-ink-muted">Спирки: </span>
            {walk.legends.map((legend) => legend.title).join(" → ")}
          </p>

          {walk.bestTime && <p className="m-0 text-xs text-ink-muted">Най-подходящо: {walk.bestTime}</p>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}