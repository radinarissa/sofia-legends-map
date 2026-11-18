import { useState } from "react";
import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { AdminLegend } from "../../types/legend";
import { CATEGORY_LABELS, CREDIBILITY_LABELS, ERA_LABELS } from "../../constants/labels";
import useReviewLegend from "../../hooks/admin/useReviewLegend";
import { getErrorMessage } from "../../api/getErrorMessage";
import { formatDate } from "../../utils/date";
import StatusChip from "../legends/StatusChip";
import SourcesList from "../legends/SourcesList";
import ScarinessDots from "../common/ScarinessDots";

interface ReviewDialogProps {
  legend: AdminLegend;
  onClose: () => void;
  onReviewed: (message: string) => void; 
}

export default function ReviewDialog({ legend, onClose, onReviewed }: ReviewDialogProps) {
  const review = useReviewLegend();
  const [rejecting, setRejecting] = useState(false); 
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);

  const mapUrl = `https://www.openstreetmap.org/?mlat=${legend.lat}&mlon=${legend.lng}#map=17/${legend.lat}/${legend.lng}`;
  const paragraphs = legend.fullStory.split("\n\n");

  const approve = () => {
    review.mutate(
      { id: legend._id, status: "approved" },
      { onSuccess: () => onReviewed(`„${legend.title}“ е одобрена и вече е на картата.`) }
    );
  };

  const reject = () => {
    if (reason.trim().length < 5) {
      setReasonError("Напишете причина (поне 5 символа)");
      return;
    }
    review.mutate(
      { id: legend._id, status: "rejected", reason: reason.trim() },
      { onSuccess: () => onReviewed(`„${legend.title}“ е отказана.`) }
    );
  };

  const facts = [
    { label: "Автор", value: legend.author ? `${legend.author.name} (${legend.author.email})` : "Начални данни" },
    { label: "Изпратена", value: formatDate(legend.createdAt) },
    { label: "Адрес", value: legend.address },
    { label: "Район", value: legend.district },
  ];

  return (
    <Dialog
      open
      onClose={review.isPending ? undefined : onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="review-title"
    >
      <DialogTitle id="review-title" sx={{ fontFamily: "var(--ink-font-heading)" }}>
        {legend.title}
      </DialogTitle>

      <DialogContent dividers>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip status={legend.status} />
            <Chip label={CATEGORY_LABELS[legend.category]} color="primary" size="small" />
            <Chip label={ERA_LABELS[legend.era]} variant="outlined" size="small" />
            <Chip label={CREDIBILITY_LABELS[legend.credibility]} variant="outlined" size="small" />
            <ScarinessDots value={legend.scariness} />
          </div>

          <p className="m-0 text-lg text-ink-muted">{legend.shortDescription}</p>

          <dl className="m-0 grid gap-3 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{fact.label}</dt>
                <dd className="m-0">{fact.value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Координати</dt>
              <dd className="m-0">
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  {legend.lat}, {legend.lng} (виж на картата)
                </a>
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>

          <SourcesList sources={legend.sources} />

          {legend.status === "rejected" && legend.rejectionReason && (
            <Alert severity="warning">Предишна причина за отказ: {legend.rejectionReason}</Alert>
          )}

          {rejecting && (
            <TextField
              label="Причина за отказа"
              multiline
              minRows={2}
              autoFocus
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                setReasonError(null);
              }}
              error={Boolean(reasonError)}
              helperText={reasonError ?? "Авторът ще види причината в профила си"}
              fullWidth
            />
          )}

          {review.isError && <Alert severity="error">{getErrorMessage(review.error)}</Alert>}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={review.isPending}>
          Затвори
        </Button>

        {legend.status !== "rejected" &&
          (rejecting ? (
            <Button color="error" variant="contained" onClick={reject} disabled={review.isPending}>
              Потвърди отказа
            </Button>
          ) : (
            <Button color="error" onClick={() => setRejecting(true)} disabled={review.isPending}>
              Откажи
            </Button>
          ))}

        {legend.status !== "approved" && !rejecting && (
          <Button color="success" variant="contained" onClick={approve} disabled={review.isPending}>
            {review.isPending ? "Запазване..." : "Одобри"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}