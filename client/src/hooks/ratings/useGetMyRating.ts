import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { MyRating } from "../../types/rating";

async function getMyRating(legendId: string): Promise<MyRating> {
  const { data } = await api.get<MyRating>(`/legends/${legendId}/rating/me`);
  return data;
}

export default function useGetMyRating(legendId: string, userId: string | undefined) {
  return useQuery({
    queryKey: ["myRating", legendId, userId],
    queryFn: () => getMyRating(legendId),
    enabled: Boolean(userId), 
    select: (data) => data.value, 
  });
}