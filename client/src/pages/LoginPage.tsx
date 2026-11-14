import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { Alert, Button, TextField } from "@mui/material";
import useAuth from "../hooks/auth/useAuth";
import useLogin from "../hooks/auth/useLogin";
import { getErrorMessage } from "../api/getErrorMessage";
import { validateEmail } from "../utils/validation";
import AuthCard from "../components/auth/AuthCard";
import PasswordField from "../components/auth/PasswordField";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false); 

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  if (isAuthenticated) return <Navigate to={from} replace />;

  const errors = {
    email: validateEmail(email),
    password: password ? null : "Въведете парола",
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (errors.email || errors.password) return;
    loginMutation.mutate({ email: email.trim(), password });
  };

  return (
    <AuthCard
      title="Вход"
      subtitle="Влезте, за да коментирате, оценявате и предлагате легенди."
      footer={
        <>
          Нямате профил?{" "}
          <Link to="/register" state={location.state}>
            Регистрирайте се
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {loginMutation.isError && <Alert severity="error">{getErrorMessage(loginMutation.error)}</Alert>}

        <TextField
          id="login-email"
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
          id="login-password"
          label="Парола"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={submitted && Boolean(errors.password)}
          helperText={submitted ? errors.password : undefined}
          fullWidth
        />

        <Button type="submit" variant="contained" size="large" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Влизане..." : "Вход"}
        </Button>
      </form>
    </AuthCard>
  );
}