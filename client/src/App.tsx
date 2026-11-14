import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import LegendDetailsPage from "./pages/LegendDetailsPage";
import RoutesPage from "./pages/RoutesPage";
import RouteDetailsPage from "./pages/RouteDetailsPage";
import SubmitLegendPage from "./pages/SubmitLegendPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      {}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="legends/:slug" element={<LegendDetailsPage />} />
        <Route path="routes" element={<RoutesPage />} />
        <Route path="routes/:slug" element={<RouteDetailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {}
        <Route element={<ProtectedRoute />}>
          <Route path="submit" element={<SubmitLegendPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>

        {}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}