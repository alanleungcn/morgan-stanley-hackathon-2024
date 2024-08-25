import { apiClient } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../types/user";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cred: Login) => {
      const res = await apiClient.post(
        "/login",
        {
          identifier: cred.email ? cred.email : cred.phoneNumber,
          password: cred.password,
        },
        {
          withCredentials: true,
        },
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
