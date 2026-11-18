import { Link, useNavigate, useParams } from "react-router";
import { Alert, Button } from "@mui/material";
import useGetMyLegend from "../hooks/legends/useGetMyLegend";
import useUpdateLegend from "../hooks/legends/useUpdateLegend";
import { isNotFoundError } from "../api/getErrorMessage";
import LegendForm from "../components/legends/LegendForm";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import NotFoundPage from "./NotFoundPage";

export default function EditLegendPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { data: legend, isPending, isError, error, refetch } = useGetMyLegend(id);
  const updateLegend = useUpdateLegend(id ?? "");

  if (isPending) return <Loader text="Зареждаме легендата..." />;
  if (isError && isNotFoundError(error)) return <NotFoundPage />;
  if (isError) return <ErrorMessage title="Не успяхме да заредим легендата" error={error} onRetry={() => refetch()} />;

  if (legend.status === "approved") {
    return (
      <Alert
        severity="info"
        sx={{ borderRadius: "var(--ink-radius)" }}
        action={
          <Button component={Link} to={`/legends/${legend.slug}`} color="inherit" size="small">
            Виж легендата
          </Button>
        }
      >
        Тази легенда вече е одобрена и не може да се редактира.
      </Alert>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <title>{`Редакция: ${legend.title} · Легендите на София`}</title>

      <header>
        <h1 className="m-0 text-3xl font-semibold md:text-4xl">Редакция на предложение</h1>
        <p className="mb-0 mt-2 text-ink-muted">След като запазите, легендата ще бъде прегледана отново.</p>
      </header>

      {legend.status === "rejected" && legend.rejectionReason && (
        <Alert severity="warning" sx={{ borderRadius: "var(--ink-radius)" }}>
          <strong>Причина за отказа:</strong> {legend.rejectionReason}
        </Alert>
      )}

      <LegendForm
        key={legend._id}
        initialLegend={legend}
        submitLabel="Запази и изпрати отново"
        isPending={updateLegend.isPending}
        error={updateLegend.isError ? updateLegend.error : undefined}
        onSubmit={(input) =>
          updateLegend.mutate(input, {
            onSuccess: () =>
              navigate("/profile", { state: { message: "Промените са запазени. Легендата чака нов преглед." } }),
          })
        }
      />
    </div>
  );
}