import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { LegendComment } from "../../types/comment";

interface UpdateCommentData {
  id: string;
  text: string;
}

async function updateComment({ id, text }: UpdateCommentData): Promise<LegendComment> {
  const { data } = await api.put<LegendComment>(`/comments/${id}`, { text });
  return data;
}

export default function useUpdateComment(legendId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments", legendId] }),
  });
}