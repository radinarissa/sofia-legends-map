import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { LegendComment } from "../../types/comment";

async function getComments(legendId: string): Promise<LegendComment[]> {
  const { data } = await api.get<LegendComment[]>(`/legends/${legendId}/comments`);
  return data;
}

export default function useGetComments(legendId: string) {
  return useQuery({
    queryKey: ["comments", legendId],
    queryFn: () => getComments(legendId),
  });
}