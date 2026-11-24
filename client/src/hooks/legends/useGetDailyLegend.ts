import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { LegendSummary } from "../../types/legend";

interface DailyLegendResponse {
  date: string; 
  legend: LegendSummary;
}

async function getDailyLegend(): Promise<DailyLegendResponse> {
  const { data } = await api.get<DailyLegendResponse>("/legends/daily");
  return data;
}

export default function useGetDailyLegend() {
  return useQuery({
    queryKey: ["dailyLegend"],
    queryFn: getDailyLegend,
    staleTime: 60 * 60 * 1000,
  });
}