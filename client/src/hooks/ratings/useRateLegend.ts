import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import useAuth from "../auth/useAuth";
import type { Legend } from "../../types/legend";
import type { MyRating, RatingResult } from "../../types/rating";

async function rateLegend(legendId: string, value: number): Promise<RatingResult> {
  const { data } = await api.put<RatingResult>(`/legends/${legendId}/rating`, { value });
  return data;
}

export default function useRateLegend(legendId: string, slug: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (value: number) => rateLegend(legendId, value),
    onSuccess: (result) => {
      queryClient.setQueryData<MyRating>(["myRating", legendId, user?._id], { value: result.myRating });
      queryClient.setQueryData<Legend>(["legend", slug], (old) =>
        old ? { ...old, ratingAverage: result.ratingAverage, ratingCount: result.ratingCount } : old
      );
      
      return queryClient.invalidateQueries({ queryKey: ["legends"] });
    },
  });
}