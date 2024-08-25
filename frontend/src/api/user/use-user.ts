import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useUser(id: number) {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await apiClient.get(`/user/${id}`);
      return response.data;
    },
  });
}
