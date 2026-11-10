import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

async function getDistricts(): Promise<string[]> {
  const { data } = await api.get<string[]>("/legends/districts");
  return data;
}

export default function useGetDistricts() {
  return useQuery({
    queryKey: ["districts"],
    queryFn: getDistricts,
    staleTime: 5 * 60 * 1000, 
  });
}