import { Slider } from "@mui/material";

interface ScarinessSliderProps {
  min?: number;
  max?: number;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

const MARKS = [1, 2, 3, 4, 5].map((value) => ({ value, label: String(value) }));

export default function ScarinessSlider({ min = 1, max = 5, onChange }: ScarinessSliderProps) {
  const handleChange = (_event: Event, value: number | number[]) => {
    if (!Array.isArray(value)) return;
    const [newMin, newMax] = value;
    onChange(newMin === 1 ? undefined : newMin, newMax === 5 ? undefined : newMax);
  };

  return (
    <div className="px-2">
      <p id="filter-scariness-label" className="m-0 text-sm text-ink-muted">
        Страшност: {min}–{max}
      </p>
      <Slider
        aria-labelledby="filter-scariness-label"
        value={[min, max]}
        onChange={handleChange}
        min={1}
        max={5}
        step={1}
        marks={MARKS}
        size="small"
        disableSwap
      />
    </div>
  );
}