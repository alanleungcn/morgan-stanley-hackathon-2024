import { apiClient } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrainingConstruct } from "../types/training";

export function useCreateTrainings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (t: TrainingConstruct) => {
      const res = await apiClient.post("/courses", t);
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Training successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["trainings"] });
    },
    onError: () => {
      toast({
        title: "Training creation failed",
      });
    },
  });
}
