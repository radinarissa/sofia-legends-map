import { Link, useLocation, useNavigate } from "react-router";
import { Alert, Button, Chip, Snackbar } from "@mui/material";
import useAuth from "../hooks/auth/useAuth";
import useGetFavorites from "../hooks/favorites/useGetFavorites";
import LegendCard from "../components/legends/LegendCard";
import MySubmissions from "../components/profile/MySubmissions";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function ProfilePage() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: favorites = [], isPending, isError, error, refetch } = useGetFavorites();

  const message = (location.state as { message?: string } | null)?.message;
  const closeMessage = () => navigate(location.pathname, { replace: true, state: null });

  return (
    <div className="flex flex-col gap-10">
      <title>Моят профил · Легендите на София</title>

      <header className="ink-card flex flex-col gap-2 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="m-0 text-3xl font-semibold">Моят профил</h1>
          {isAdmin && <Chip label="Администратор" color="primary" size="small" />}
        </div>
        <p className="m-0 text-ink-muted">
          {user?.name} · {user?.email}
        </p>
      </header>

      <section className="flex flex-col gap-4" aria-labelledby="favorites-title">
        <h2 id="favorites-title" className="m-0 text-2xl font-semibold">
          Любими легенди {!isPending && !isError && `(${favorites.length})`}
        </h2>

        {isPending && <Loader text="Зареждаме любимите ви легенди..." />}

        {isError && <ErrorMessage title="Не успяхме да заредим любимите" error={error} onRetry={() => refetch()} />}

        {!isPending &&
          !isError &&
          (favorites.length === 0 ? (
            <div className="ink-card flex flex-col items-start gap-3 p-6">
              <p className="m-0 text-ink-muted">
                Още нямате любими легенди. Натиснете сърцето на легенда, за да я запазите тук.
              </p>
              <Button component={Link} to="/map" variant="contained">
                Към картата
              </Button>
            </div>
          ) : (
            <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((legend) => (
                <li key={legend._id}>
                  <LegendCard legend={legend} />
                </li>
              ))}
            </ul>
          ))}
      </section>

      <MySubmissions />

      {}
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={closeMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={closeMessage}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}