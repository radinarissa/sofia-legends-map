import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";

async function deleteComment(id: string): Promise<void> {
  await api.delete(`/comments/${id}`);
}

export default function useDeleteComment(legendId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments", legendId] }),
  });
}