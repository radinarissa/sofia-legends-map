import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import useAuth from "../auth/useAuth";
import type { LegendSummary } from "../../types/legend";

async function getFavorites(): Promise<LegendSummary[]> {
  const { data } = await api.get<LegendSummary[]>("/users/me/favorites");
  return data;
}

export default function useGetFavorites() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?._id],
    queryFn: getFavorites,
    enabled: Boolean(user),
  });
}