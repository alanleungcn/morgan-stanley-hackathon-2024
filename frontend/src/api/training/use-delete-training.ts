import { apiClient } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTraining() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trainingId: number) => {
      const res = await apiClient.delete(`/courses/${trainingId}`);
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Training successfully deleted",
      });
      queryClient.invalidateQueries({ queryKey: ["trainings"] });
    },
    onError: () => {
      toast({
        title: "Training fafiled to be deleted",
      });
    },
  });
}
