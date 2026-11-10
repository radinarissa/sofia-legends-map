import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SortOption } from "../../types/legend";
import { SORT_LABELS } from "../../constants/labels";

interface SortSelectProps {
  value?: SortOption;
  onChange: (sort: SortOption) => void;
}

export default function SortSelect({ value = "title", onChange }: SortSelectProps) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="filter-sort-label">Подреди по</InputLabel>
      <Select
        labelId="filter-sort-label"
        id="filter-sort"
        value={value}
        label="Подреди по"
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
          <MenuItem key={key} value={key}>
            {SORT_LABELS[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}