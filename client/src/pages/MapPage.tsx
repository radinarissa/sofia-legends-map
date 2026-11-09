import useGetLegends from "../hooks/legends/useGetLegends";
import LegendMap from "../components/map/LegendMap";

export default function MapPage() {
  const { data = [] } = useGetLegends();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold md:text-4xl">Карта на легендите</h1>
      <LegendMap legends={data} />
    </div>
  );
}