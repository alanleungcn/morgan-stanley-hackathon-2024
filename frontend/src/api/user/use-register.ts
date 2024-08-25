import { apiClient } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Register } from "../types/user";

export function useRegister() {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (cred: Register) => {
      const res = await apiClient.post("/register", {
        ...cred,
        // dateOfBirth: cred.dateOfBirth.toISOString(),
      });
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
      });
      navigate({ to: "/auth/login" });
      // queryClient.
      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast({
        title: "Registration Failed",
      });
    },
  });
}
