import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";

const userQueryKeys = {
  all: ["users"],
  details: () => [...userQueryKeys.all, "detail"],
  detail: (id: number) => [...userQueryKeys.details(), id],
  pagination: (page: number) => [...userQueryKeys.all, "pagination", page],
  infinite: () => [...userQueryKeys.all, "infinite"],
};

export function useUser(id: string) {
  const getUserFn = async () => {
    const response = await apiClient.get(`${id}`);
    return response.data;
  };

  return useQuery({
    queryKey: userQueryKeys.detail(Number(id)),
    queryFn: getUserFn,
  });
}
