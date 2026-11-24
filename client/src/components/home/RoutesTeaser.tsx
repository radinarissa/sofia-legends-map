import { Link } from "react-router";
import useGetRoutes from "../../hooks/routes/useGetRoutes";
import RouteCard from "../routes/RouteCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function RoutesTeaser() {
  const { data: walks = [], isPending, isError, error, refetch } = useGetRoutes();

  return (
    <section className="flex flex-col gap-4" aria-labelledby="routes-teaser-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="routes-teaser-title" className="m-0 text-2xl font-semibold md:text-3xl">
          Нощни разходки
        </h2>
        <Link to="/routes" className="font-semibold">
          Всички разходки →
        </Link>
      </div>

      {isPending && <Loader />}
      {isError && <ErrorMessage error={error} onRetry={() => refetch()} />}

      {!isPending && !isError && (
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {walks.slice(0, 2).map((walk) => (
            <li key={walk._id}>
              <RouteCard walk={walk} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}