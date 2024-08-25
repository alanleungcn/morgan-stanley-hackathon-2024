import { useQuery } from "@tanstack/react-query";
import { apiClient } from "..";
import { Training } from "../types/training";

export function useTrainings() {
  return useQuery<Training[]>({
    queryKey: ["trainings"],
    queryFn: async () => {
      const res = await apiClient.get(`/courses`);
      return res.data;
    },
  });
}
