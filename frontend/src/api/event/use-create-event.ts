import { apiClient } from "@/api";
import { useMutationState, useQuery } from "@tanstack/react-query";

export function useCreateEvent() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await apiClient.get(`/events`);
      return response.data;
    },
  });

  return useMutationState({});
}
