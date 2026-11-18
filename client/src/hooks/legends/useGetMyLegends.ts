import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import useAuth from "../auth/useAuth";
import type { Legend } from "../../types/legend";

async function getMyLegends(): Promise<Legend[]> {
  const { data } = await api.get<Legend[]>("/legends/mine");
  return data;
}

export default function useGetMyLegends() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["myLegends", user?._id],
    queryFn: getMyLegends,
    enabled: Boolean(user),
  });
}