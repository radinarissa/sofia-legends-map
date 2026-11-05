import { useParams } from "react-router";

export default function RouteDetailsPage() {
  const { slug } = useParams();
  return <h1 className="text-3xl font-semibold">Маршрут: {slug}</h1>;
}