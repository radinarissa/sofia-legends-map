import { useLocation, useNavigate, useParams } from "react-router";
import { Button, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsIcon from "@mui/icons-material/Directions";
import useGetLegend from "../hooks/legends/useGetLegend";
import { isNotFoundError } from "../api/getErrorMessage";
import { CATEGORY_LABELS, ERA_LABELS } from "../constants/labels";
import CredibilityChip from "../components/legends/CredibilityChip";
import LegendFacts from "../components/legends/LegendFacts";
import SourcesList from "../components/legends/SourcesList";
import ImageGallery from "../components/legends/ImageGallery";
import MiniMap from "../components/map/MiniMap";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import NotFoundPage from "./NotFoundPage";

export default function LegendDetailsPage() {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { data: legend, isPending, isError, error, refetch } = useGetLegend(slug);

  const goBack = () => (location.key !== "default" ? navigate(-1) : navigate("/map"));

  if (isPending) return <Loader text="Зареждаме легендата..." />;

  if (isError && isNotFoundError(error)) return <NotFoundPage />;

  if (isError) {
    return <ErrorMessage title="Не успяхме да заредим легендата" error={error} onRetry={() => refetch()} />;
  }

  const paragraphs = legend.fullStory.split("\n\n");
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${legend.lat},${legend.lng}`;

  return (
    <article className="flex flex-col gap-6">
      {}
      <title>{`${legend.title} · Легендите на София`}</title>

      <div>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack} color="inherit">
          Назад
        </Button>
      </div>

      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Chip label={CATEGORY_LABELS[legend.category]} color="primary" size="small" />
          <Chip label={ERA_LABELS[legend.era]} variant="outlined" size="small" />
          <CredibilityChip value={legend.credibility} />
        </div>
        <h1 className="m-0 text-3xl font-semibold md:text-5xl">{legend.title}</h1>
        <p className="m-0 max-w-3xl text-lg text-ink-muted">{legend.shortDescription}</p>
      </header>

      {}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="ink-card flex flex-col gap-8 p-5 md:p-8">
          <div className="flex max-w-prose flex-col gap-4 text-[1.05rem] leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>
          <ImageGallery images={legend.images} title={legend.title} />
          <SourcesList sources={legend.sources} />
        </div>

        <aside className="ink-card flex flex-col gap-5 self-start p-5">
          <LegendFacts legend={legend} />
          {}
          <MiniMap key={legend._id} lat={legend.lat} lng={legend.lng} title={legend.title} />
          <Button
            component="a"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<DirectionsIcon />}
          >
            Как да стигна дотук
          </Button>
        </aside>
      </div>
    </article>
  );
}