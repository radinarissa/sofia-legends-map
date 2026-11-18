import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { Legend, LegendInput } from "../../types/legend";

async function updateLegend(id: string, input: LegendInput): Promise<Legend> {
  const { data } = await api.put<Legend>(`/legends/${id}`, input);
  return data;
}

export default function useUpdateLegend(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LegendInput) => updateLegend(id, input),
    onSuccess: (legend) => {
      queryClient.setQueryData(["myLegend", id], legend); 
      return queryClient.invalidateQueries({ queryKey: ["myLegends"] });
    },
  });
}