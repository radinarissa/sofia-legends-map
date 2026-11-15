import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { LegendComment } from "../../types/comment";

async function addComment(legendId: string, text: string): Promise<LegendComment> {
  const { data } = await api.post<LegendComment>(`/legends/${legendId}/comments`, { text });
  return data;
}

export default function useAddComment(legendId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => addComment(legendId, text),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments", legendId] }),
  });
}