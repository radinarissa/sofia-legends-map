import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

interface RandomLegend {
  _id: string;
  slug: string;
  title: string;
}

async function getRandomLegend(exclude?: string): Promise<RandomLegend> {
  const { data } = await api.get<RandomLegend>("/legends/random", { params: { exclude } });
  return data;
}

export default function useGetRandomLegend(exclude?: string) {
  return useQuery({
    queryKey: ["randomLegend", exclude],
    queryFn: () => getRandomLegend(exclude),
    enabled: false, 
    gcTime: 0, 
  });
}