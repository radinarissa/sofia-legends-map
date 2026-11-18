import { Link } from "react-router";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useGetMyLegends from "../../hooks/legends/useGetMyLegends";
import { formatDate } from "../../utils/date";
import StatusChip from "../legends/StatusChip";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function MySubmissions() {
  const { data: legends = [], isPending, isError, error, refetch } = useGetMyLegends();

  return (
    <section className="flex flex-col gap-4" aria-labelledby="submissions-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="submissions-title" className="m-0 text-2xl font-semibold">
          Моите предложения {!isPending && !isError && `(${legends.length})`}
        </h2>
        <Button component={Link} to="/submit" variant="outlined" startIcon={<AddIcon />}>
          Нова легенда
        </Button>
      </div>

      {isPending && <Loader text="Зареждаме предложенията ви..." />}

      {isError && <ErrorMessage title="Не успяхме да заредим предложенията" error={error} onRetry={() => refetch()} />}

      {!isPending &&
        !isError &&
        (legends.length === 0 ? (
          <div className="ink-card p-6 text-ink-muted">
            Още не сте предлагали легенди. Знаете история за място в София? Разкажете я!
          </div>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {legends.map((legend) => (
              <li
                key={legend._id}
                className="ink-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading text-lg font-semibold">{legend.title}</span>
                    <StatusChip status={legend.status} />
                  </div>
                  <span className="text-sm text-ink-muted">Изпратена на {formatDate(legend.createdAt)}</span>
                  {legend.status === "rejected" && legend.rejectionReason && (
                    <span className="text-sm text-red-700">Причина за отказа: {legend.rejectionReason}</span>
                  )}
                </div>

                {legend.status === "approved" ? (
                  <Button component={Link} to={`/legends/${legend.slug}`}>
                    Виж легендата
                  </Button>
                ) : (
                  <Button component={Link} to={`/my-legends/${legend._id}/edit`} startIcon={<EditOutlinedIcon />}>
                    Редактирай
                  </Button>
                )}
              </li>
            ))}
          </ul>
        ))}
    </section>
  );
}