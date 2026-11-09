import { Link } from "react-router";
import { Chip } from "@mui/material";
import type { LegendSummary } from "../../types/legend";
import { CATEGORY_LABELS } from "../../constants/labels";

interface LegendPopupProps {
  legend: LegendSummary;
}

export default function LegendPopup({ legend }: LegendPopupProps) {
  return (
    <div className="flex max-w-60 flex-col gap-2">
      <Chip label={CATEGORY_LABELS[legend.category]} size="small" color="primary" variant="outlined" className="self-start" />
      <h3 className="m-0 text-lg font-semibold leading-tight">{legend.title}</h3>
      <p className="m-0 text-sm text-ink-muted">{legend.shortDescription}</p>
      <p className="m-0 text-sm" aria-label={`Страшност ${legend.scariness} от 5`}>
        Страшност: <span className="text-ink-accent">{"●".repeat(legend.scariness)}</span>
        <span className="text-ink-border">{"●".repeat(5 - legend.scariness)}</span>
      </p>
      <Link to={`/legends/${legend.slug}`} className="font-semibold">
        Прочети още →
      </Link>
    </div>
  );
}