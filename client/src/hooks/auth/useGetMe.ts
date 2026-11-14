import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { User } from "../../types/user";


async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/auth/me");
  return data;
}

export default function useGetMe(token: string | null) {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: Boolean(token),
    staleTime: Infinity, 
    retry: false,
  });
}