import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type { LegendFilters } from "../../types/legend";
import { CATEGORY_LABELS, ERA_LABELS } from "../../constants/labels";
import { countActiveFilters } from "../../utils/filters";
import MultiSelectFilter from "./MultiSelectFilter";

interface FilterPanelProps {
  filters: LegendFilters;
  onChange: (filters: LegendFilters) => void;
  onReset: () => void;
}

export default function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  const update = (changes: Partial<LegendFilters>) => onChange({ ...filters, ...changes });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MultiSelectFilter
          id="filter-category"
          label="Категория"
          options={CATEGORY_LABELS}
          value={filters.category ?? []}
          onChange={(category) => update({ category })}
        />
        <MultiSelectFilter
          id="filter-era"
          label="Епоха"
          options={ERA_LABELS}
          value={filters.era ?? []}
          onChange={(era) => update({ era })}
        />
      </div>

      <div className="flex justify-end">
        <Button startIcon={<RestartAltIcon />} onClick={onReset} disabled={countActiveFilters(filters) === 0}>
          Изчисти филтрите
        </Button>
      </div>
    </div>
  );
}