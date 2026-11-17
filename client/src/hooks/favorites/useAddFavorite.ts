import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { User } from "../../types/user";
import type { FavoritesResponse } from "../../types/favorite";

async function addFavorite(legendId: string): Promise<FavoritesResponse> {
  const { data } = await api.post<FavoritesResponse>(`/users/me/favorites/${legendId}`);
  return data;
}

export default function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,

    onMutate: async (legendId) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });
      const previous = queryClient.getQueryData<User>(["me"]); 
      queryClient.setQueryData<User>(["me"], (old) =>
        old ? { ...old, favorites: [...old.favorites, legendId] } : old
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