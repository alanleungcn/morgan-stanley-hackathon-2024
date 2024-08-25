import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Training } from "../types/training";

export function useCreateTrainings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (t: Training) => {
      const res = await apiClient.post("/trainings", t);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainings"] });
    },
  });
}
