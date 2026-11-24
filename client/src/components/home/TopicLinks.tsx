import { Link } from "react-router";
import { Chip } from "@mui/material";
import type { Category } from "../../types/legend";
import { CATEGORY_LABELS } from "../../constants/labels";

export default function TopicLinks() {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="topics-title">
      <h2 id="topics-title" className="m-0 text-2xl font-semibold md:text-3xl">
        Разгледай по тема
      </h2>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(CATEGORY_LABELS) as Category[]).map((category) => (
          <Chip
            key={category}
            label={CATEGORY_LABELS[category]}
            component={Link}
            to={`/map?category=${category}`}
            clickable
            variant="outlined"
            color="primary"
            sx={{ fontSize: "1rem", height: 40, px: 1, backgroundColor: "var(--ink-surface)" }}
          />
        ))}
      </div>
    </section>
  );
}