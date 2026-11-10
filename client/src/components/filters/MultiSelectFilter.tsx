import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface MultiSelectFilterProps<T extends string> {
  id: string;
  label: string;
  options: Record<T, string>; 
  value: T[];
  onChange: (value: T[]) => void;
}

export default function MultiSelectFilter<T extends string>({
  id,
  label,
  options,
  value,
  onChange,
}: MultiSelectFilterProps<T>) {
  const labelId = `${id}-label`;

  const handleChange = (event: SelectChangeEvent<T[]>) => {
    const selected = event.target.value;
    onChange((typeof selected === "string" ? selected.split(",") : selected) as T[]);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select<T[]>
        labelId={labelId}
        id={id}
        multiple
        value={value}
        label={label}
        onChange={handleChange}
        renderValue={(selected) => selected.map((key) => options[key]).join(", ")}
      >
        {(Object.keys(options) as T[]).map((key) => (
          <MenuItem key={key} value={key}>
            <Checkbox checked={value.includes(key)} size="small" />
            <ListItemText primary={options[key]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}