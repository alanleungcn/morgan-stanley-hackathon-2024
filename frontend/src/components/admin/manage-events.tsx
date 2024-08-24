import { LayoutGrid, LayoutList } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEvents } from "@/api/event/use-events";
import EventCard from "../event-card";
import { Input } from "../ui/input";
import { useState } from "react";

export const ManageEvents = () => {
  const { data } = useEvents();

  const [layout, setLayout] = useState<"grid" | "list">("list");

  return (
    <div className="flex justify-center">
      <div className="p-8 max-w-[1000px] w-full flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <div className="flex gap-8">
          <Input placeholder="Search" />
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

        <div>
          {data?.map((e) => (
            <EventCard
              key={e.eventId}
              event={e}
              buttonText="Edit"
              buttonAction={() => {}}
              layout={layout}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
