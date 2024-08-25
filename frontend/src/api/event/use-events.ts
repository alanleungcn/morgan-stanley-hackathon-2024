import { useQuery } from "@tanstack/react-query";
import { apiClient } from "..";
import { Event } from "../types/event";

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await apiClient.get(`/events`);
      return res.data.events;
    },
  });
}
