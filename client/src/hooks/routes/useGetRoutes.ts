import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { NightWalkSummary } from "../../types/route";

async function getRoutes(): Promise<NightWalkSummary[]> {
  const { data } = await api.get<NightWalkSummary[]>("/routes");
  return data;
}

export default function useGetRoutes() {
  return useQuery({
    queryKey: ["nightWalks"],
    queryFn: getRoutes,
    staleTime: 5 * 60 * 1000, 
  });
}