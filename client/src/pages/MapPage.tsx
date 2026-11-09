import useGetLegends from "../hooks/legends/useGetLegends";
import LegendMap from "../components/map/LegendMap";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function MapPage() {
  const { data: legends = [], isPending, isError, error, refetch } = useGetLegends();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-semibold md:text-4xl">Карта на легендите</h1>
        <p className="mt-2 text-ink-muted">
          {isPending ? "Търсим легендите из града..." : `${legends.length} легенди из София и околностите`}
        </p>
      </header>

      {isPending && <Loader text="Зареждаме легендите..." />}

      {isError && (
        <ErrorMessage title="Не успяхме да заредим легендите" error={error} onRetry={() => refetch()} />
      )}

      {!isPending && !isError && <LegendMap legends={legends} />}
    </div>
  );
}