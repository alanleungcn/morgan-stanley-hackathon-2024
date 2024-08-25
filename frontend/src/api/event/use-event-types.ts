import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { EventTags } from "../types/event";

export function useEventTags() {
  return useQuery<EventTags>({
    queryKey: ["eventTags"],
    queryFn: async () => {
      const res = await apiClient.get(`/event_types`);
      return res.data;
    },
  });
}
