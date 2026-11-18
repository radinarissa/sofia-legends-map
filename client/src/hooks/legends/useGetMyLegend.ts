import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { isNotFoundError } from "../../api/getErrorMessage";
import type { Legend } from "../../types/legend";

async function getMyLegend(id: string): Promise<Legend> {
  const { data } = await api.get<Legend>(`/legends/mine/${id}`);
  return data;
}

export default function useGetMyLegend(id: string | undefined) {
  return useQuery({
    queryKey: ["myLegend", id],
    queryFn: () => getMyLegend(id as string),
    enabled: Boolean(id),
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
  });
}