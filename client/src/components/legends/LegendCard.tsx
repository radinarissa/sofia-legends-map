import { Link } from "react-router";
import { Card, CardActionArea, CardContent, Chip } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import type { LegendSummary } from "../../types/legend";
import { CATEGORY_LABELS, ERA_LABELS } from "../../constants/labels";
import ScarinessDots from "../common/ScarinessDots";

interface LegendCardProps {
  legend: LegendSummary;
}

export default function LegendCard({ legend }: LegendCardProps) {
  return (
    <Card variant="outlined">
      <CardActionArea component={Link} to={`/legends/${legend.slug}`}>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Chip label={CATEGORY_LABELS[legend.category]} size="small" color="primary" />
            <Chip label={ERA_LABELS[legend.era]} size="small" variant="outlined" />
          </div>

          <h3 className="m-0 text-lg font-semibold leading-snug">{legend.title}</h3>

          <p className="m-0 line-clamp-2 text-sm text-ink-muted">{legend.shortDescription}</p>

          <div className="flex items-center justify-between gap-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1">
              <PlaceOutlinedIcon fontSize="small" />
              {legend.district}
            </span>
            <ScarinessDots value={legend.scariness} />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}