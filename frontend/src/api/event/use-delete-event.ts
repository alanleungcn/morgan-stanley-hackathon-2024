import { apiClient } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventId: number) => {
      const res = await apiClient.delete(`/events/${eventId}`);
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Event successfully deleted",
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: () => {
      toast({
        title: "Event failed to be deleted",
      });
    },
  });
}
