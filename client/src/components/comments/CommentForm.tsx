import { useState } from "react";
import type { FormEvent } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { getErrorMessage } from "../../api/getErrorMessage";
import { validateComment } from "../../utils/validation";

const MAX_LENGTH = 1000;

interface CommentFormProps {
  initialText?: string;
  submitLabel: string;
  isPending: boolean;
  error?: unknown;
  onSubmit: (text: string) => Promise<unknown>;
  onCancel?: () => void; 
}

export default function CommentForm({
  initialText = "",
  submitLabel,
  isPending,
  error,
  onSubmit,
  onCancel,
}: CommentFormProps) {
  const [text, setText] = useState(initialText);
  const [submitted, setSubmitted] = useState(false);

  const validationError = validateComment(text);
  const showError = submitted && Boolean(validationError);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (validationError) return;

    try {
      await onSubmit(text.trim());
      setText(""); 
      setSubmitted(false);
    } catch (submitError) {
      console.warn("Коментарът не беше изпратен", submitError);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      {Boolean(error) && <Alert severity="error">{getErrorMessage(error)}</Alert>}

      <TextField
        label={initialText ? "Редакция на коментара" : "Вашият коментар"}
        placeholder="Чували ли сте друга версия на тази легенда?"
        multiline
        minRows={3}
        fullWidth
        value={text}
        onChange={(event) => setText(event.target.value)}
        error={showError}
        helperText={showError ? validationError : `${text.length}/${MAX_LENGTH}`}
        slotProps={{ htmlInput: { maxLength: MAX_LENGTH } }}
      />

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button onClick={onCancel} disabled={isPending}>
            Откажи
          </Button>
        )}
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? "Изпращане..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}