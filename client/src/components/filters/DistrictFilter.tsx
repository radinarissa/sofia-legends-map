import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useGetDistricts from "../../hooks/legends/useGetDistricts";

interface DistrictFilterProps {
  value?: string;
  onChange: (district: string | undefined) => void;
}

export default function DistrictFilter({ value, onChange }: DistrictFilterProps) {
  const { data: districts = [], isPending } = useGetDistricts();

  return (
    <FormControl fullWidth size="small" disabled={isPending}>
      <InputLabel id="filter-district-label">Район</InputLabel>
      <Select
        labelId="filter-district-label"
        id="filter-district"
        value={value ?? ""}
        label="Район"
        onChange={(event) => onChange(event.target.value || undefined)}
      >
        <MenuItem value="">
          <em>Всички райони</em>
        </MenuItem>
        {districts.map((district) => (
          <MenuItem key={district} value={district}>
            {district}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}