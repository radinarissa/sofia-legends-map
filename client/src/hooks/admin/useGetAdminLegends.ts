import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import type { AdminLegend, LegendStatus } from "../../types/legend";

async function getAdminLegends(status: LegendStatus): Promise<AdminLegend[]> {
  const { data } = await api.get<AdminLegend[]>("/admin/legends", { params: { status } });
  return data;
}

export default function useGetAdminLegends(status: LegendStatus) {
  return useQuery({
    queryKey: ["adminLegends", status],
    queryFn: () => getAdminLegends(status),
  });
}