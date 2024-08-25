import { apiClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../types/user";

export function useLogin() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cred: Login) => {
      const res = await apiClient.post("/login", cred);
      return res.data;
    },
    onSuccess: () => {
      // update local user
    },
  });
}
