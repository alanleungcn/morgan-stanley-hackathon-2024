import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "../types/user";

export function useUser() {
  return useQuery<UserInfo>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiClient.get(`/user_info`, {
        withCredentials: true,
      });
      return res.data;
    },
    retry: false,
  });
}
