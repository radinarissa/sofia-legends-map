import type { Category } from "../../types/legend";
import { CATEGORY_LABELS } from "../../constants/labels";
import CategoryGlyph from "./CategoryGlyph";

export default function MapKey() {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 px-4 py-3" aria-label="Обяснение на иконите">
      {(Object.keys(CATEGORY_LABELS) as Category[]).map((category) => (
        <li key={category} className="flex items-center gap-2 text-sm">
          <CategoryGlyph category={category} />
          {CATEGORY_LABELS[category]}
        </li>
      ))}
      <li className="flex items-center gap-2 text-sm text-ink-muted">
        <span className="legend-cluster-key" aria-hidden="true">
          3
        </span>
        Група легенди (клик за приближаване)
      </li>
    </ul>
  );
}