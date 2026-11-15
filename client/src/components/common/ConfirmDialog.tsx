import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Потвърди",
  isPending = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={isPending ? undefined : onClose} aria-labelledby="confirm-dialog-title">
      <DialogTitle id="confirm-dialog-title" sx={{ fontFamily: "var(--ink-font-heading)" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Откажи
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={isPending}>
          {isPending ? "Изтриване..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}