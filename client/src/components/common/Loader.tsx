import { CircularProgress } from "@mui/material";

interface LoaderProps {
  text?: string;
}

export default function Loader({ text = "Зареждане..." }: LoaderProps) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16">
      <CircularProgress />
      <p className="text-ink-muted">{text}</p>
    </div>
  );
}