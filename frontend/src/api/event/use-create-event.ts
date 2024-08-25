import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventConstruct } from "../types/event";

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (event: EventConstruct) => {
      const res = await apiClient.post("/events", event);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
