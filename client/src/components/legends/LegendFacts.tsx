import type { ReactNode } from "react";
import type { Legend } from "../../types/legend";
import { CREDIBILITY_LABELS, ERA_LABELS } from "../../constants/labels";
import ScarinessDots from "../common/ScarinessDots";

interface LegendFactsProps {
  legend: Legend;
}

export default function LegendFacts({ legend }: LegendFactsProps) {
  const facts: { label: string; value: ReactNode }[] = [
    { label: "Адрес", value: legend.address },
    { label: "Район", value: legend.district },
    { label: "Епоха", value: ERA_LABELS[legend.era] },
    { label: "Страшност", value: <ScarinessDots value={legend.scariness} /> },
    { label: "Достоверност", value: CREDIBILITY_LABELS[legend.credibility] },
  ];

  return (
    <dl className="m-0 flex flex-col gap-3">
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col gap-0.5 border-b border-dashed border-ink-border pb-3 last:border-0 last:pb-0">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{fact.label}</dt>
          <dd className="m-0">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}