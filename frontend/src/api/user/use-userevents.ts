import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Events } from "@/api/types/event"; 

export function useUserEvents(userId: number) {
  return useQuery<Events>({
    queryKey: ["user-events", userId],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${userId}/events`);
      return response.data;
    },
  });
}
