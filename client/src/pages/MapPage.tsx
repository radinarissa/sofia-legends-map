import useGetLegends from "../hooks/legends/useGetLegends";

export default function MapPage() {
  const { data, isPending, isError } = useGetLegends();

  if (isPending) return <p>Зареждане...</p>;
  if (isError) return <p>Грешка</p>;

  return (
    <div>
      <h1 className="text-3xl font-semibold">Карта на легендите</h1>
      <p>Заредени са {data.length} легенди.</p>
      <ul className="list-disc pl-6">
        {data.map((legend) => (
          <li key={legend._id}>{legend.title}</li>
        ))}
      </ul>
    </div>
  );
}