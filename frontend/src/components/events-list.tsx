import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  Coffee,
  Dices,
  HandHeart,
  LayoutGrid,
  LayoutList,
  PencilRuler,
} from "lucide-react";

import { useEventTags } from "@/api/event/use-event-types";
import { useEvents } from "@/api/event/use-events";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import EventCard from "./event-card";
import { Input } from "./ui/input";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

type Filter = "all" | "today" | "weekend";

export const EventsList = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const { data } = useEvents();

  const [layout, setLayout] = useState<"grid" | "list">("list");

  const router = useRouter();

  const { data: eventTags, isSuccess: isSuccessEventTags } = useEventTags();

  const [eventTag, setEventTag] = useState("All");

  const [search, setSearch] = useState("");

  const events = useMemo(() => {
    if (!data) return [];

    return data.filter((e) => {
      return (
        (eventTag === "All" || e.eventType === eventTag) &&
        e.eventName.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [eventTag, data, search]);

  return (
    <div className="flex flex-col p-4">
      <div className="scrollbar-hide mb-4 flex w-[calc(100vw-2rem)] gap-2 overflow-x-scroll sm:w-full sm:justify-between">
        {[
          "All",
          "Social Gathering",
          "Counselling",
          "Training",
          "Workshop",
          "Other",
        ].map((tag) => (
          <Button
            variant="ghost"
            className={cn(
              "flex h-20 w-20 flex-shrink-0 flex-grow-0 flex-col gap-2 rounded-xl",
              eventTag === tag && "bg-primary/50",
            )}
            onClick={() => setEventTag(tag)}
          >
            {tag === "All" && <LayoutGrid className="h-6 w-6" />}
            {tag === "Social Gathering" && <Coffee className="h-6 w-6" />}
            {tag === "Counselling" && <HandHeart className="h-6 w-6" />}
            {tag === "Training" && <BriefcaseBusiness className="h-6 w-6" />}
            {tag === "Workshop" && <PencilRuler className="h-6 w-6" />}
            {tag === "Other" && <Dices className="h-6 w-6" />}
            <p className="text-xs">
              {tag === "Social Gathering" ? "Gathering" : tag}
            </p>
          </Button>
        ))}
      </div>

      <div className="mb-4 flex w-full gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />

        <Select value={eventTag} onValueChange={(v) => setEventTag(v)}>
          <SelectTrigger className="w-2/5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {isSuccessEventTags &&
              ["All"].concat(eventTags).map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
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

      <div className="mb-4 flex">
        {["all", "today", "weekend"].map((f) => {
          return (
            <Button
              key={f}
              variant="ghost"
              className={cn(
                filter === f && "rounded-none border-b-4 border-primary",
                "px-4 capitalize",
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
          "grid grid-cols-1 gap-4 sm:grid-cols-2",
          layout === "list" && "!grid-cols-1",
        )}
      >
        {events.map((e) => {
          return (
            <EventCard
              key={e.eventId}
              event={e}
              buttonAction={() =>
                router.navigate({
                  to: `/events/event-details/${e.eventId}`,
                })
              }
              buttonText="Details"
              layout={layout}
            >
              <Button
                className="w-full lg:w-32"
                onClick={() =>
                  router.navigate({
                    to: `/events/event-details/${e.eventId}`,
                  })
                }
              >
                Details
              </Button>
            </EventCard>
          );
        })}
      </div>
    </div>
  );
};
