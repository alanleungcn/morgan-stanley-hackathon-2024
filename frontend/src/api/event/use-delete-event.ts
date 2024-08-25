import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "../types/event";

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (event: Event) => {
      const res = await apiClient.delete(`/events/${event.eventId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
