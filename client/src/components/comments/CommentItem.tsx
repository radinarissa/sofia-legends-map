import { useState } from "react";
import { Alert, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import type { LegendComment } from "../../types/comment";
import useAuth from "../../hooks/auth/useAuth";
import useUpdateComment from "../../hooks/comments/useUpdateComment";
import useDeleteComment from "../../hooks/comments/useDeleteComment";
import { getErrorMessage } from "../../api/getErrorMessage";
import { formatDate, wasEdited } from "../../utils/date";
import ConfirmDialog from "../common/ConfirmDialog";
import CommentForm from "./CommentForm";

interface CommentItemProps {
  comment: LegendComment;
  legendId: string;
}

export default function CommentItem({ comment, legendId }: CommentItemProps) {
  const { user, isAdmin } = useAuth();
  const updateComment = useUpdateComment(legendId);
  const deleteComment = useDeleteComment(legendId);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isOwner = Boolean(user && comment.author && user._id === comment.author._id);
  const canDelete = isOwner || isAdmin;

  const handleDelete = () => {
    deleteComment.mutate(comment._id, { onSuccess: () => setConfirmOpen(false) });
  };

  return (
    <li className="flex flex-col gap-2 border-b border-dashed border-ink-border pb-4 last:border-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-semibold">{comment.author?.name ?? "Изтрит потребител"}</span>
        <span className="text-xs text-ink-muted">
          {formatDate(comment.createdAt)}
          {wasEdited(comment.createdAt, comment.updatedAt) && " · редактиран"}
        </span>
      </div>

      {isEditing ? (
        <CommentForm
          initialText={comment.text}
          submitLabel="Запази"
          isPending={updateComment.isPending}
          error={updateComment.isError ? updateComment.error : undefined}
          onCancel={() => setIsEditing(false)}
          onSubmit={async (text) => {
            await updateComment.mutateAsync({ id: comment._id, text });
            setIsEditing(false);
          }}
        />
      ) : (
        <p className="m-0 whitespace-pre-line">{comment.text}</p>
      )}

      {deleteComment.isError && <Alert severity="error">{getErrorMessage(deleteComment.error)}</Alert>}

      {!isEditing && canDelete && (
        <div className="flex gap-1">
          {isOwner && (
            <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => setIsEditing(true)}>
              Редактирай
            </Button>
          )}
          <Button size="small" color="error" startIcon={<DeleteOutlineIcon />} onClick={() => setConfirmOpen(true)}>
            Изтрий
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Изтриване на коментар"
        message="Сигурни ли сте, че искате да изтриете този коментар? Това не може да бъде върнато."
        confirmLabel="Изтрий"
        isPending={deleteComment.isPending}
        onConfirm={handleDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </li>
  );
}