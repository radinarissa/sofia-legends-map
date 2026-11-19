import { useLocation, useNavigate, useParams } from "react-router";
import { Alert, Button, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsIcon from "@mui/icons-material/Directions";
import useGetRoute from "../hooks/routes/useGetRoute";
import { isNotFoundError } from "../api/getErrorMessage";
import { TRAVEL_MODE_LABELS } from "../constants/labels";
import { directionsUrl, formatDuration, formatKm, routeDistanceKm } from "../utils/geo";
import RouteMap from "../components/map/RouteMap";
import RouteStopsList from "../components/routes/RouteStopsList";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import NotFoundPage from "./NotFoundPage";

export default function RouteDetailsPage() {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { data: walk, isPending, isError, error, refetch } = useGetRoute(slug);

  const goBack = () => (location.key !== "default" ? navigate(-1) : navigate("/routes"));

  if (isPending) return <Loader text="Зареждаме маршрута..." />;
  if (isError && isNotFoundError(error)) return <NotFoundPage />;
  if (isError) return <ErrorMessage title="Не успяхме да заредим маршрута" error={error} onRetry={() => refetch()} />;

  const stops = walk.legends;
  const distance = routeDistanceKm(stops);

  return (
    <article className="flex flex-col gap-6">
      <title>{`${walk.title} · Нощни разходки`}</title>

      <div>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack} color="inherit">
          Всички разходки
        </Button>
      </div>

      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Chip label={TRAVEL_MODE_LABELS[walk.travelMode]} color="primary" size="small" />
          <Chip label={formatDuration(walk.durationMinutes)} variant="outlined" size="small" />
          <Chip label={`${stops.length} спирки`} variant="outlined" size="small" />
          <Chip label={`${formatKm(distance)} по права линия`} variant="outlined" size="small" />
        </div>
        <h1 className="m-0 text-3xl font-semibold md:text-5xl">{walk.title}</h1>
        <p className="m-0 max-w-3xl text-lg text-ink-muted">{walk.description}</p>
        {walk.bestTime && <p className="m-0 text-sm text-ink-muted">Най-подходящо време: {walk.bestTime}</p>}

        {stops.length >= 2 && (
          <div>
            <Button
              component="a"
              href={directionsUrl(stops, walk.travelMode)}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<DirectionsIcon />}
            >
              Започни разходката
            </Button>
          </div>
        )}
      </header>

      {stops.length < 2 ? (
        <Alert severity="info" sx={{ borderRadius: "var(--ink-radius)" }}>
          Маршрутът временно няма достатъчно спирки.
        </Alert>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {}
          <RouteMap key={walk._id} stops={stops} />
          <div className="lg:max-h-[560px] lg:overflow-y-auto lg:pr-2">
            <RouteStopsList stops={stops} />
          </div>
        </div>
      )}
    </article>
  );
}