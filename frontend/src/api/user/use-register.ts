import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Register } from "../types/user";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cred: Register) => {
      const res = await apiClient.post("/register", {
        ...cred,
        // dateOfBirth: cred.dateOfBirth.toISOString(),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
