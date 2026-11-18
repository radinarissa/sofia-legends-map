import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { Legend, LegendInput } from "../../types/legend";

async function submitLegend(input: LegendInput): Promise<Legend> {
  const { data } = await api.post<Legend>("/legends", input);
  return data;
}

export default function useSubmitLegend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitLegend,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myLegends"] }),
  });
}