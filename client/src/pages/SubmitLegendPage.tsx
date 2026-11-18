import LegendForm from "../components/legends/LegendForm";

export default function SubmitLegendPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <LegendForm submitLabel="Изпрати" isPending={false} onSubmit={(input) => console.log(input)} />
    </div>
  );
}