import type { Category } from "../../types/legend";
import { CATEGORY_ICON_PATHS } from "../../constants/categoryIcons";

interface CategoryGlyphProps {
  category: Category;
}

export default function CategoryGlyph({ category }: CategoryGlyphProps) {
  return (
    <span
      className={`category-bg--${category} inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d={CATEGORY_ICON_PATHS[category]} />
      </svg>
    </span>
  );
}