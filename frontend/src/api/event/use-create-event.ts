import { apiClient } from "@/api";
import { toast } from "@/components/ui/use-toast";
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
      toast({
        title: "Event successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: () => {
      toast({
        title: "Event creation failed",
      });
    },
  });
}
