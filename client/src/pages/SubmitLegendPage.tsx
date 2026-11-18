import { useNavigate } from "react-router";
import useSubmitLegend from "../hooks/legends/useSubmitLegend";
import LegendForm from "../components/legends/LegendForm";

export default function SubmitLegendPage() {
  const navigate = useNavigate();
  const submitLegend = useSubmitLegend();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <title>Предложи легенда · Легендите на София</title>

      <header>
        <h1 className="m-0 text-3xl font-semibold md:text-4xl">Предложи легенда</h1>
        <p className="mb-0 mt-2 text-ink-muted">
          Знаете история за място в София? Разкажете я. След като я изпратите, администратор ще я прегледа, а
          след одобрение тя ще се появи на картата.
        </p>
      </header>

      <LegendForm
        submitLabel="Изпрати за преглед"
        isPending={submitLegend.isPending}
        error={submitLegend.isError ? submitLegend.error : undefined}
        onSubmit={(input) =>
          submitLegend.mutate(input, {
            onSuccess: () =>
              navigate("/profile", {
                state: { message: "Легендата е изпратена за преглед. Ще я видите на картата след одобрение." },
              }),
          })
        }
      />
    </div>
  );
}