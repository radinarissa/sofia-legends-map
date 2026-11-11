import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { isNotFoundError } from "../../api/getErrorMessage";
import type { Legend } from "../../types/legend";

async function getLegend(slug: string): Promise<Legend> {
  const { data } = await api.get<Legend>(`/legends/${encodeURIComponent(slug)}`);
  return data;
}

export default function useGetLegend(slug: string | undefined) {
  return useQuery({
    queryKey: ["legend", slug],
    queryFn: () => getLegend(slug as string),
    enabled: Boolean(slug), 
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
  });
}