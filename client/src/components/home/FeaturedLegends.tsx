import { Link } from "react-router";
import useGetLegends from "../../hooks/legends/useGetLegends";
import LegendCard from "../legends/LegendCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function FeaturedLegends() {
  const { data: legends = [], isPending, isError, error, refetch } = useGetLegends({ sort: "-scariness" });
  const featured = legends.slice(0, 3);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="featured-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="featured-title" className="m-0 text-2xl font-semibold md:text-3xl">
          Най-страшните легенди
        </h2>
        {}
        <Link to="/map?sort=-scariness" className="font-semibold">
          Виж всички →
        </Link>
      </div>

      {isPending && <Loader />}
      {isError && <ErrorMessage error={error} onRetry={() => refetch()} />}

      {!isPending && !isError && (
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((legend) => (
            <li key={legend._id}>
              <LegendCard legend={legend} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}