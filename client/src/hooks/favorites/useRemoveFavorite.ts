import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { User } from "../../types/user";
import type { FavoritesResponse } from "../../types/favorite";

async function removeFavorite(legendId: string): Promise<FavoritesResponse> {
  const { data } = await api.delete<FavoritesResponse>(`/users/me/favorites/${legendId}`);
  return data;
}

export default function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,

    onMutate: async (legendId) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });
      const previous = queryClient.getQueryData<User>(["me"]);
      queryClient.setQueryData<User>(["me"], (old) =>
        old ? { ...old, favorites: old.favorites.filter((id) => id !== legendId) } : old
      );
      return { previous };
    },

    onError: (_error, _legendId, context) => {
      if (context?.previous) queryClient.setQueryData(["me"], context.previous);
    },

    onSuccess: (data) => {
      queryClient.setQueryData<User>(["me"], (old) => (old ? { ...old, favorites: data.favorites } : old));
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
}