import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import type { AdminLegend, LegendStatus } from "../types/legend";
import { CATEGORY_LABELS } from "../constants/labels";
import useGetAdminLegends from "../hooks/admin/useGetAdminLegends";
import { formatDate } from "../utils/date";
import StatusChip from "../components/legends/StatusChip";
import ReviewDialog from "../components/admin/ReviewDialog";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

const STATUS_TABS: { value: LegendStatus; label: string }[] = [
  { value: "pending", label: "Чакащи" },
  { value: "approved", label: "Одобрени" },
  { value: "rejected", label: "Отказани" },
];

export default function AdminPage() {
  const [status, setStatus] = useState<LegendStatus>("pending");
  const [order, setOrder] = useState<"asc" | "desc">("desc"); 
  const [selected, setSelected] = useState<AdminLegend | null>(null); 
  const [message, setMessage] = useState<string | null>(null);
  const { data: legends = [], isPending, isError, error, refetch } = useGetAdminLegends(status);

  const sortedLegends = useMemo(
    () =>
      [...legends].sort((a, b) => {
        const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return order === "asc" ? diff : -diff;
      }),
    [legends, order]
  );

  return (
    <div className="flex flex-col gap-6">
      <title>Модерация · Легендите на София</title>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 text-3xl font-semibold md:text-4xl">Модерация</h1>
          <p className="mb-0 mt-2 text-ink-muted">Прегледайте предложените легенди, преди да се появят на картата.</p>
        </div>
        <ToggleButtonGroup
          exclusive
          size="small"
          color="primary"
          value={status}
          onChange={(_event, value: LegendStatus | null) => value && setStatus(value)}
          aria-label="Статус на легендите"
        >
          {STATUS_TABS.map((tab) => (
            <ToggleButton key={tab.value} value={tab.value}>
              {tab.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </header>

      {isPending && <Loader text="Зареждаме легендите..." />}

      {isError && <ErrorMessage title="Не успяхме да заредим легендите" error={error} onRetry={() => refetch()} />}

      {!isPending &&
        !isError &&
        (sortedLegends.length === 0 ? (
          <div className="ink-card p-6 text-center text-ink-muted">Няма легенди в тази група.</div>
        ) : (
          <TableContainer className="ink-card">
            <Table size="small" aria-label="Легенди за модерация" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Заглавие</TableCell>
                  <TableCell>Автор</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell sortDirection={order}>
                    <TableSortLabel
                      active
                      direction={order}
                      onClick={() => setOrder((current) => (current === "asc" ? "desc" : "asc"))}
                    >
                      Изпратена
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedLegends.map((legend) => (
                  <TableRow key={legend._id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{legend.title}</TableCell>
                    <TableCell>{legend.author?.name ?? "—"}</TableCell>
                    <TableCell>{CATEGORY_LABELS[legend.category]}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{formatDate(legend.createdAt)}</TableCell>
                    <TableCell>
                      <StatusChip status={legend.status} />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" onClick={() => setSelected(legend)}>
                        Прегледай
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}

      {}
      {selected && (
        <ReviewDialog
          key={selected._id}
          legend={selected}
          onClose={() => setSelected(null)}
          onReviewed={(text) => {
            setSelected(null);
            setMessage(text);
          }}
        />
      )}

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={5000}
        onClose={() => setMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setMessage(null)}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}