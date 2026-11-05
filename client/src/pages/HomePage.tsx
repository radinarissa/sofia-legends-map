import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-semibold">Легендите на София</h1>
      <Loader />
      <ErrorMessage error={new Error("Пробна грешка")} onRetry={() => alert("Опитвам пак")} />
    </div>
  );
}