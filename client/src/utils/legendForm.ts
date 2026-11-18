import type { Category, Credibility, Era, Legend, LegendInput, Source } from "../types/legend";
import type { LatLng } from "../components/map/LocationPicker";

export interface LegendFormValues {
  title: string;
  shortDescription: string;
  fullStory: string;
  address: string;
  district: string;
  location: LatLng | null;
  category: Category | "";
  era: Era | "";
  credibility: Credibility | "";
  scariness: number;
  sources: Source[];
}

export type LegendFormErrors = Partial<Record<keyof LegendFormValues, string>>;

export const EMPTY_LEGEND_FORM: LegendFormValues = {
  title: "",
  shortDescription: "",
  fullStory: "",
  address: "",
  district: "",
  location: null,
  category: "",
  era: "",
  credibility: "",
  scariness: 3,
  sources: [{ title: "", url: "" }],
};

export function legendToFormValues(legend: Legend): LegendFormValues {
  return {
    title: legend.title,
    shortDescription: legend.shortDescription,
    fullStory: legend.fullStory,
    address: legend.address,
    district: legend.district,
    location: { lat: legend.lat, lng: legend.lng },
    category: legend.category,
    era: legend.era,
    credibility: legend.credibility,
    scariness: legend.scariness,
    sources: legend.sources.length > 0 ? legend.sources : [{ title: "", url: "" }],
  };
}

export function formValuesToInput(values: LegendFormValues): LegendInput {
  return {
    title: values.title.trim(),
    shortDescription: values.shortDescription.trim(),
    fullStory: values.fullStory.trim(),
    address: values.address.trim(),
    district: values.district.trim(),
    lat: values.location?.lat ?? 0,
    lng: values.location?.lng ?? 0,
    category: values.category as Category,
    era: values.era as Era,
    credibility: values.credibility as Credibility,
    scariness: values.scariness,
    sources: values.sources
      .map((source) => ({ title: source.title.trim(), url: source.url.trim() }))
      .filter((source) => source.title || source.url),
  };
}

const URL_REGEX = /^https?:\/\/\S+$/;

export function validateLegendForm(values: LegendFormValues): LegendFormErrors {
  const errors: LegendFormErrors = {};

  const title = values.title.trim();
  if (title.length < 3) errors.title = "Заглавието трябва да е поне 3 символа";
  else if (title.length > 120) errors.title = "Заглавието може да е най-много 120 символа";

  const short = values.shortDescription.trim();
  if (short.length < 20) errors.shortDescription = "Напишете поне 20 символа";
  else if (short.length > 300) errors.shortDescription = "Краткото описание може да е най-много 300 символа";

  if (values.fullStory.trim().length < 100) {
    errors.fullStory = "Разкажете историята по-подробно (поне 100 символа)";
  }

  if (values.address.trim().length < 3) errors.address = "Въведете адрес или описание на мястото";
  if (!values.district.trim()) errors.district = "Изберете или напишете район";

  if (!values.location) {
    errors.location = "Изберете място на картата";
  } else {
    const { lat, lng } = values.location;
    if (lat < 42.4 || lat > 42.85 || lng < 23.1 || lng > 23.55) {
      errors.location = "Мястото трябва да е в София или околностите";
    }
  }

  if (!values.category) errors.category = "Изберете категория";
  if (!values.era) errors.era = "Изберете епоха";
  if (!values.credibility) errors.credibility = "Изберете достоверност";

  const filled = values.sources.filter((source) => source.title.trim() || source.url.trim());
  if (filled.length === 0) {
    errors.sources = "Добавете поне един източник";
  } else if (filled.some((source) => !source.title.trim() || !URL_REGEX.test(source.url.trim()))) {
    errors.sources = "Всеки източник трябва да има заглавие и линк, който започва с http:// или https://";
  }

  return errors;
}