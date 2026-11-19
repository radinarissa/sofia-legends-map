import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { isNotFoundError } from "../../api/getErrorMessage";
import type { NightWalk } from "../../types/route";

async function getRoute(slug: string): Promise<NightWalk> {
  const { data } = await api.get<NightWalk>(`/routes/${encodeURIComponent(slug)}`);
  return data;
}

export default function useGetRoute(slug: string | undefined) {
  return useQuery({
    queryKey: ["nightWalk", slug],
    queryFn: () => getRoute(slug as string),
    enabled: Boolean(slug),
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
  });
}