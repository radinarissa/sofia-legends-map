import type { LegendSummary } from "../../types/legend";
import LegendCard from "./LegendCard";

interface LegendListProps {
  legends: LegendSummary[];
}

export default function LegendList({ legends }: LegendListProps) {
  if (legends.length === 0) {
    return <div className="ink-card p-6 text-center text-ink-muted">Няма легенди, които отговарят на филтрите.</div>;
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {legends.map((legend) => (
        <li key={legend._id}>
          <LegendCard legend={legend} />
        </li>
      ))}
    </ul>
  );
}