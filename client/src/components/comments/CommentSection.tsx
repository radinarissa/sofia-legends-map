import { Link, useLocation } from "react-router";
import { Alert } from "@mui/material";
import useAuth from "../../hooks/auth/useAuth";
import useGetComments from "../../hooks/comments/useGetComments";
import useAddComment from "../../hooks/comments/useAddComment";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface CommentSectionProps {
  legendId: string;
}

export default function CommentSection({ legendId }: CommentSectionProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { data: comments = [], isPending, isError, error, refetch } = useGetComments(legendId);
  const addComment = useAddComment(legendId);

  return (
    <section className="ink-card flex flex-col gap-5 p-5 md:p-8" aria-labelledby="comments-title">
      <h2 id="comments-title" className="m-0 text-2xl font-semibold">
        Коментари {!isPending && !isError && `(${comments.length})`}
      </h2>

      {isAuthenticated ? (
        <CommentForm
          submitLabel="Публикувай"
          isPending={addComment.isPending}
          error={addComment.isError ? addComment.error : undefined}
          onSubmit={(text) => addComment.mutateAsync(text)}
        />
      ) : (
        <Alert severity="info" sx={{ borderRadius: "var(--ink-radius)" }}>
          <Link to="/login" state={{ from: location.pathname }}>
            Влезте в профила си
          </Link>
          , за да коментирате.
        </Alert>
      )}

      {isPending && <Loader text="Зареждаме коментарите..." />}

      {isError && <ErrorMessage title="Не успяхме да заредим коментарите" error={error} onRetry={() => refetch()} />}

      {!isPending && !isError &&
        (comments.length === 0 ? (
          <p className="m-0 text-ink-muted">Още няма коментари. Бъдете първи!</p>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} legendId={legendId} />
            ))}
          </ul>
        ))}
    </section>
  );
}