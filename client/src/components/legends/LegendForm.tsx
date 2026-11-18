import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Alert, Autocomplete, Button, IconButton, MenuItem, Slider, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import type { Category, Credibility, Era, Legend, LegendInput, Source } from "../../types/legend";
import { CATEGORY_LABELS, CREDIBILITY_LABELS, ERA_LABELS } from "../../constants/labels";
import useGetDistricts from "../../hooks/legends/useGetDistricts";
import { getErrorMessage } from "../../api/getErrorMessage";
import { EMPTY_LEGEND_FORM, formValuesToInput, legendToFormValues, validateLegendForm } from "../../utils/legendForm";
import type { LegendFormValues } from "../../utils/legendForm";
import LocationPicker from "../map/LocationPicker";

const SCARINESS_MARKS = [1, 2, 3, 4, 5].map((value) => ({ value, label: String(value) }));

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="m-0 flex flex-col gap-4 border-0 p-0">
      <legend className="mb-2 p-0 font-heading text-xl font-semibold">{title}</legend>
      {children}
    </fieldset>
  );
}

interface LegendFormProps {
  initialLegend?: Legend; 
  submitLabel: string;
  isPending: boolean;
  error?: unknown;
  onSubmit: (input: LegendInput) => void;
}

export default function LegendForm({ initialLegend, submitLabel, isPending, error, onSubmit }: LegendFormProps) {
  const { data: districts = [] } = useGetDistricts();
  const [values, setValues] = useState<LegendFormValues>(() =>
    initialLegend ? legendToFormValues(initialLegend) : EMPTY_LEGEND_FORM
  );
  const [submitted, setSubmitted] = useState(false); 

  const errors = validateLegendForm(values);
  const hasErrors = Object.keys(errors).length > 0;
  const fieldError = (field: keyof LegendFormValues) => (submitted ? errors[field] : undefined);

  const setField = <K extends keyof LegendFormValues>(field: K, value: LegendFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const updateSource = (index: number, key: keyof Source, value: string) => {
    setField(
      "sources",
      values.sources.map((source, i) => (i === index ? { ...source, [key]: value } : source))
    );
  };
  const addSource = () => setField("sources", [...values.sources, { title: "", url: "" }]);
  const removeSource = (index: number) => setField("sources", values.sources.filter((_, i) => i !== index));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;
    onSubmit(formValuesToInput(values));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="ink-card flex flex-col gap-8 p-5 md:p-8">
      {Boolean(error) && <Alert severity="error">{getErrorMessage(error)}</Alert>}

      <FormSection title="Основно">
        <TextField
          id="legend-title"
          label="Заглавие"
          value={values.title}
          onChange={(event) => setField("title", event.target.value)}
          error={Boolean(fieldError("title"))}
          helperText={fieldError("title")}
          fullWidth
        />
        <TextField
          id="legend-short"
          label="Кратко описание"
          placeholder="1–2 изречения, които се виждат на картата"
          multiline
          minRows={2}
          value={values.shortDescription}
          onChange={(event) => setField("shortDescription", event.target.value)}
          error={Boolean(fieldError("shortDescription"))}
          helperText={fieldError("shortDescription") ?? `${values.shortDescription.length}/300`}
          fullWidth
        />
      </FormSection>

      <FormSection title="История">
        <TextField
          id="legend-story"
          label="Пълната история"
          placeholder="Разкажете легендата със свои думи. Нов абзац започва след празен ред."
          multiline
          minRows={8}
          value={values.fullStory}
          onChange={(event) => setField("fullStory", event.target.value)}
          error={Boolean(fieldError("fullStory"))}
          helperText={fieldError("fullStory") ?? `${values.fullStory.length} символа`}
          fullWidth
        />
      </FormSection>

      <FormSection title="Място">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            id="legend-address"
            label="Адрес"
            placeholder="напр. ул. Малко Търново"
            value={values.address}
            onChange={(event) => setField("address", event.target.value)}
            error={Boolean(fieldError("address"))}
            helperText={fieldError("address")}
            fullWidth
          />
          {}
          <Autocomplete
            id="legend-district"
            freeSolo
            options={districts}
            inputValue={values.district}
            onInputChange={(_event, value) => setField("district", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Район"
                error={Boolean(fieldError("district"))}
                helperText={fieldError("district") ?? "Изберете от списъка или напишете нов"}
              />
            )}
          />
        </div>
        <LocationPicker
          value={values.location}
          onChange={(location) => setField("location", location)}
          error={fieldError("location")}
        />
      </FormSection>

      <FormSection title="Класификация">
        <div className="grid gap-4 md:grid-cols-3">
          <TextField
            id="legend-category"
            select
            label="Категория"
            value={values.category}
            onChange={(event) => setField("category", event.target.value as Category)}
            error={Boolean(fieldError("category"))}
            helperText={fieldError("category")}
            fullWidth
          >
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => (
              <MenuItem key={key} value={key}>
                {CATEGORY_LABELS[key]}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="legend-era"
            select
            label="Епоха"
            value={values.era}
            onChange={(event) => setField("era", event.target.value as Era)}
            error={Boolean(fieldError("era"))}
            helperText={fieldError("era")}
            fullWidth
          >
            {(Object.keys(ERA_LABELS) as Era[]).map((key) => (
              <MenuItem key={key} value={key}>
                {ERA_LABELS[key]}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="legend-credibility"
            select
            label="Достоверност"
            value={values.credibility}
            onChange={(event) => setField("credibility", event.target.value as Credibility)}
            error={Boolean(fieldError("credibility"))}
            helperText={fieldError("credibility")}
            fullWidth
          >
            {(Object.keys(CREDIBILITY_LABELS) as Credibility[]).map((key) => (
              <MenuItem key={key} value={key}>
                {CREDIBILITY_LABELS[key]}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="px-2">
          <p id="legend-scariness-label" className="m-0 text-sm text-ink-muted">
            Страшност: {values.scariness} от 5
          </p>
          <Slider
            aria-labelledby="legend-scariness-label"
            value={values.scariness}
            onChange={(_event, value) => setField("scariness", value as number)}
            min={1}
            max={5}
            step={1}
            marks={SCARINESS_MARKS}
          />
        </div>
      </FormSection>

      <FormSection title="Източници">
        <p className="m-0 text-sm text-ink-muted">
          Откъде знаете историята? Статия, книга, предаване. Поне един източник е задължителен.
        </p>

        {values.sources.map((source, index) => (
          <div key={index} className="grid items-start gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <TextField
              label="Заглавие на източника"
              size="small"
              value={source.title}
              onChange={(event) => updateSource(index, "title", event.target.value)}
              fullWidth
            />
            <TextField
              label="Линк"
              placeholder="https://..."
              size="small"
              value={source.url}
              onChange={(event) => updateSource(index, "url", event.target.value)}
              fullWidth
            />
            <IconButton
              aria-label="Премахни източника"
              onClick={() => removeSource(index)}
              disabled={values.sources.length === 1}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ))}

        {fieldError("sources") && <p className="m-0 text-sm text-red-700">{fieldError("sources")}</p>}

        <div>
          <Button startIcon={<AddIcon />} onClick={addSource}>
            Добави източник
          </Button>
        </div>
      </FormSection>

      <div className="flex flex-col gap-3 border-t border-dashed border-ink-border pt-6">
        {submitted && hasErrors && (
          <Alert severity="warning">Има полета за поправяне. Проверете маркираните в червено.</Alert>
        )}
        <div className="flex justify-end">
          <Button type="submit" variant="contained" size="large" disabled={isPending}>
            {isPending ? "Изпращане..." : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}