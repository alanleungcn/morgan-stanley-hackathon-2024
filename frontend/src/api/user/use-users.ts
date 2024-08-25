import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "../types/user";

export function useUsers() {
  return useQuery<UserInfo[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await apiClient.get(`/users`);
      return res.data.users;
    },
  });
}
