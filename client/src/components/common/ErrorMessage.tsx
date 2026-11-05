import { Alert, AlertTitle, Button } from "@mui/material";
import { getErrorMessage } from "../../api/getErrorMessage";

interface ErrorMessageProps {
  error: unknown;
  title?: string;
  onRetry?: () => void; 
}

export default function ErrorMessage({ error, title = "Нещо се обърка", onRetry }: ErrorMessageProps) {
  return (
    <Alert
      severity="error"
      sx={{ borderRadius: "var(--ink-radius)" }}
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Опитай пак
          </Button>
        )
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {getErrorMessage(error)}
    </Alert>
  );
}