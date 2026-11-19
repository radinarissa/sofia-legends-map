import useGetRoutes from "../hooks/routes/useGetRoutes";
import RouteCard from "../components/routes/RouteCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function RoutesPage() {
  const { data: walks = [], isPending, isError, error, refetch } = useGetRoutes();

  return (
    <div className="flex flex-col gap-6">
      <title>Нощни разходки · Легендите на София</title>

      <header>
        <h1 className="m-0 text-3xl font-semibold md:text-4xl">Нощни разходки</h1>
        <p className="mb-0 mt-2 max-w-2xl text-ink-muted">
          Тематични маршрути през легендите на София. Изберете един, вземете фенерче и тръгвайте.
        </p>
      </header>

      {isPending && <Loader text="Зареждаме маршрутите..." />}

      {isError && <ErrorMessage title="Не успяхме да заредим маршрутите" error={error} onRetry={() => refetch()} />}

      {!isPending &&
        !isError &&
        (walks.length === 0 ? (
          <div className="ink-card p-6 text-center text-ink-muted">Още няма маршрути.</div>
        ) : (
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {walks.map((walk) => (
              <li key={walk._id}>
                <RouteCard walk={walk} />
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}