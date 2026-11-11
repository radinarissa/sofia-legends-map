import { useParams } from "react-router";
import useGetLegend from "../hooks/legends/useGetLegend";

export default function LegendDetailsPage() {
  const { slug } = useParams();
  const { data: legend, isPending, isError } = useGetLegend(slug);

  if (isPending) return <p>Зареждане...</p>;
  if (isError) return <p>Грешка</p>;

  return <h1 className="text-3xl font-semibold">{legend.title}</h1>;
}