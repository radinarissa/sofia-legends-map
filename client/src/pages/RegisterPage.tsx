import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { Alert, Button, TextField } from "@mui/material";
import useAuth from "../hooks/auth/useAuth";
import useRegister from "../hooks/auth/useRegister";
import { getErrorMessage } from "../api/getErrorMessage";
import { validateEmail, validateName, validatePassword } from "../utils/validation";
import AuthCard from "../components/auth/AuthCard";
import PasswordField from "../components/auth/PasswordField";

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const registerMutation = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  if (isAuthenticated) return <Navigate to={from} replace />;

  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: confirmPassword === password ? null : "Паролите не съвпадат",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;
    registerMutation.mutate({ name: name.trim(), email: email.trim(), password });
  };

  return (
    <AuthCard
      title="Регистрация"
      subtitle="Създайте профил, за да пазите любими легенди и да предлагате нови."
      footer={
        <>
          Вече имате профил?{" "}
          <Link to="/login" state={location.state}>
            Влезте
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {registerMutation.isError && <Alert severity="error">{getErrorMessage(registerMutation.error)}</Alert>}

        <TextField
          id="register-name"
          label="Име"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={submitted && Boolean(errors.name)}
          helperText={submitted ? errors.name : undefined}
          fullWidth
        />

        <TextField
          id="register-email"
          label="Имейл"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={submitted && Boolean(errors.email)}
          helperText={submitted ? errors.email : undefined}
          fullWidth
        />

        <PasswordField
          id="register-password"
          label="Парола"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={submitted && Boolean(errors.password)}
          helperText={submitted ? errors.password : "Поне 8 символа"}
          fullWidth
        />

        <PasswordField
          id="register-confirm-password"
          label="Повторете паролата"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={submitted && Boolean(errors.confirmPassword)}
          helperText={submitted ? errors.confirmPassword : undefined}
          fullWidth
        />

        <Button type="submit" variant="contained" size="large" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Създаване..." : "Създай профил"}
        </Button>
      </form>
    </AuthCard>
  );
}