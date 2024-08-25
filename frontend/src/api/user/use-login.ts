import { apiClient } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Login } from "../types/user";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      toast({
        title: "Login Successful",
      });
      navigate({ to: "/" });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Login Failed",
      });
      navigate({ to: "/" });
    },
  });
}
