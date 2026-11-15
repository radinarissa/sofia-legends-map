import { useState } from "react";
import { Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import type { LegendComment } from "../../types/comment";
import useAuth from "../../hooks/auth/useAuth";
import useUpdateComment from "../../hooks/comments/useUpdateComment";
import { formatDate, wasEdited } from "../../utils/date";
import CommentForm from "./CommentForm";

interface CommentItemProps {
  comment: LegendComment;
  legendId: string;
}

export default function CommentItem({ comment, legendId }: CommentItemProps) {
  const { user } = useAuth();
  const updateComment = useUpdateComment(legendId);
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = Boolean(user && comment.author && user._id === comment.author._id);

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

      {!isEditing && isOwner && (
        <div className="flex gap-1">
          <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => setIsEditing(true)}>
            Редактирай
          </Button>
        </div>
      )}
    </li>
  );
}