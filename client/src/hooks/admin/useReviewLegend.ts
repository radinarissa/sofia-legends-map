import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { Legend } from "../../types/legend";

interface ReviewData {
  id: string;
  status: "approved" | "rejected";
  reason?: string;
}

async function reviewLegend({ id, status, reason }: ReviewData): Promise<Legend> {
  const { data } = await api.put<Legend>(`/admin/legends/${id}/status`, { status, reason });
  return data;
}

export default function useReviewLegend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewLegend,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["adminLegends"] }),
        queryClient.invalidateQueries({ queryKey: ["legends"] }),
        queryClient.invalidateQueries({ queryKey: ["districts"] }),
      ]),
  });
}