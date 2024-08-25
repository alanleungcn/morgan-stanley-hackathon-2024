import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventId: number) => {
      const res = await apiClient.delete(`/events/${eventId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
