import useAuth from "../hooks/auth/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="m-0 text-3xl font-semibold">Моят профил</h1>
      <p className="m-0 text-ink-muted">
        Здравейте, {user?.name}! Тук скоро ще са любимите ви легенди и вашите предложения.
      </p>
    </div>
  );
}