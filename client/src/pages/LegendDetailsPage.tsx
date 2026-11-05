import { useParams } from "react-router";

export default function LegendDetailsPage() {
  const { slug } = useParams();
  return <h1 className="text-3xl font-semibold">Легенда: {slug}</h1>;
}