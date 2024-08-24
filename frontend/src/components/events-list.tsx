import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useEvents } from "@/api/event/use-events";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import EventCard from "./event-card";
import { useRouter } from "@tanstack/react-router";

type Filter = "all" | "today" | "weekend";

export const EventsList = () => {
  const [filter, setFilter] = useState<Filter>("all");

  // const { data, isSuccess } = useQuery({
  //   queryKey: ["root"],
  //   queryFn: () => apiClient.get("/").then((res) => res.data),
  // });

  const { data } = useEvents();

  const [layout, setLayout] = useState<"grid" | "list">("list");

  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex gap-4">
        <Input type="email" placeholder="Search" />

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mental">Mental</SelectItem>
            <SelectItem value="gathering">Gathering</SelectItem>
            <SelectItem value="...">...</SelectItem>
          </SelectContent>
        </Select>

        <ToggleGroup
          type="single"
          value={layout}
          // @ts-expect-error string is right
          onValueChange={(v) => setLayout(v)}
        >
          <ToggleGroupItem value="list" aria-label="Toggle bold">
            <LayoutList className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Toggle italic">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex">
        {["all", "today", "weekend"].map((f) => {
          return (
            <Button
              variant="ghost"
              className={cn(
                filter === f && "border-b-4 rounded-none border-primary",
                "capitalize px-4",
              )}
              onClick={() => setFilter(f as Filter)}
            >
              {f}
            </Button>
          );
        })}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3",
          layout === "list" && "!grid-cols-1",
        )}
      >
        {data?.map((e) => {
          return (
            <EventCard
              event={e}
              buttonAction={() =>
                router.navigate({ to: `/events/event-details/${e.eventId}` })
              }
              buttonText="Details"
              layout={layout}
            />
          );
        })}
      </div>
    </div>
  );
};
