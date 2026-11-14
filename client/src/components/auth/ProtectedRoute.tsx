import { Navigate, Outlet, useLocation } from "react-router";
import { Alert } from "@mui/material";
import useAuth from "../../hooks/auth/useAuth";
import Loader from "../common/Loader";

interface ProtectedRouteProps {
  adminOnly?: boolean;
}

export default function ProtectedRoute({ adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loader text="Проверяваме профила..." />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <Alert severity="warning" sx={{ borderRadius: "var(--ink-radius)" }}>
        Само администратори имат достъп до тази страница.
      </Alert>
    );
  }

  return <Outlet />;
}