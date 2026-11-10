import { useMemo, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { Era, LegendSummary } from "../../types/legend";
import { ERA_LABELS } from "../../constants/labels";
import LegendCard from "./LegendCard";

type GroupBy = "none" | "district" | "era";

interface LegendGroup {
  key: string;
  title: string;
  legends: LegendSummary[];
}

const ERA_ORDER = Object.keys(ERA_LABELS) as Era[];

function groupLegends(legends: LegendSummary[], groupBy: "district" | "era"): LegendGroup[] {
  const groups = new Map<string, LegendSummary[]>();

  for (const legend of legends) {
    const key = groupBy === "district" ? legend.district : legend.era;
    const list = groups.get(key) ?? [];
    list.push(legend);
    groups.set(key, list);
  }

  const result = [...groups.entries()].map(([key, items]) => ({
    key,
    title: groupBy === "district" ? key : ERA_LABELS[key as Era],
    legends: items,
  }));

  if (groupBy === "era") {
    return result.sort((a, b) => ERA_ORDER.indexOf(a.key as Era) - ERA_ORDER.indexOf(b.key as Era));
  }
  return result.sort((a, b) => a.title.localeCompare(b.title, "bg"));
}

function CardList({ legends }: { legends: LegendSummary[] }) {
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

interface LegendListProps {
  legends: LegendSummary[];
}

export default function LegendList({ legends }: LegendListProps) {
  const [groupBy, setGroupBy] = useState<GroupBy>("none");

  const groups = useMemo(
    () => (groupBy === "none" ? [] : groupLegends(legends, groupBy)),
    [legends, groupBy]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-ink-muted">Групирай по:</span>
        <ToggleButtonGroup
          size="small"
          color="primary"
          exclusive
          value={groupBy}
          onChange={(_event, value: GroupBy | null) => value && setGroupBy(value)}
          aria-label="Групиране на легендите"
        >
          <ToggleButton value="none">Без групи</ToggleButton>
          <ToggleButton value="district">Район</ToggleButton>
          <ToggleButton value="era">Епоха</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {legends.length === 0 ? (
        <div className="ink-card p-6 text-center text-ink-muted">Няма легенди, които отговарят на филтрите.</div>
      ) : groupBy === "none" ? (
        <CardList legends={legends} />
      ) : (
        <div className="flex flex-col gap-2">
          {groups.map((group) => (
            <Accordion
              key={group.key}
              defaultExpanded
              disableGutters
              elevation={0}
              sx={{ background: "transparent", "&::before": { display: "none" } }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <span className="font-heading text-lg font-semibold">{group.title}</span>
                <Chip label={group.legends.length} size="small" className="ml-2" />
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                <CardList legends={group.legends} />
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}