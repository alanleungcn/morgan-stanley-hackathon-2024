import { apiClient } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegisterEventVolunteer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventId: number) => {
      const res = await apiClient.post(`/register_event_volunteer/${eventId}`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Successfully registered to event",
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: () => {
      toast({
        title: "Failed to register to event",
      });
    },
  });
}
