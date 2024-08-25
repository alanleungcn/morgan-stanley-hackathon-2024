import { useQuery } from "@tanstack/react-query";
import { apiClient } from "..";

export function useTags() {
  return useQuery<string[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await apiClient.get(`/tags`);
      return res.data.tags;
    },
  });
}
