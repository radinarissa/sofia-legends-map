import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import type { Source } from "../../types/legend";

interface SourcesListProps {
  sources: Source[];
}

export default function SourcesList({ sources }: SourcesListProps) {
  if (sources.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="m-0 text-xl font-semibold">Източници</h2>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
              {source.title}
              <OpenInNewIcon sx={{ fontSize: 14 }} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}