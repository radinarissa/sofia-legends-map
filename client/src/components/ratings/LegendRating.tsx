import { Link, useLocation } from "react-router";
import { Alert, Rating } from "@mui/material";
import type { Legend } from "../../types/legend";
import useAuth from "../../hooks/auth/useAuth";
import useGetMyRating from "../../hooks/ratings/useGetMyRating";
import useRateLegend from "../../hooks/ratings/useRateLegend";
import { getErrorMessage } from "../../api/getErrorMessage";

const accentStars = { "& .MuiRating-iconFilled": { color: "var(--ink-accent)" } };

interface LegendRatingProps {
  legend: Legend;
}

export default function LegendRating({ legend }: LegendRatingProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const { data: myRating } = useGetMyRating(legend._id, user?._id);
  const rateLegend = useRateLegend(legend._id, legend.slug);

  const countText =
    legend.ratingCount === 0
      ? "Още няма оценки"
      : `${legend.ratingAverage.toFixed(1)} от ${legend.ratingCount} ${legend.ratingCount === 1 ? "оценка" : "оценки"}`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Оценка на читателите</span>
        <div className="flex flex-wrap items-center gap-2">
          <Rating value={legend.ratingAverage} precision={0.5} readOnly size="small" sx={accentStars} />
          <span className="text-sm text-ink-muted">{countText}</span>
        </div>
      </div>

      {isAuthenticated ? (
        <div className="flex flex-col gap-0.5">
          <span id="my-rating-label" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Вашата оценка
          </span>
          <Rating
            name="my-rating"
            aria-labelledby="my-rating-label"
            value={myRating ?? null}
            disabled={rateLegend.isPending}
            sx={accentStars}
            onChange={(_event, value) => {
              if (value) rateLegend.mutate(value);
            }}
          />
        </div>
      ) : (
        <p className="m-0 text-sm">
          <Link to="/login" state={{ from: location.pathname }}>
            Влезте
          </Link>
          , за да оцените легендата.
        </p>
      )}

      {rateLegend.isError && <Alert severity="error">{getErrorMessage(rateLegend.error)}</Alert>}
    </div>
  );
}