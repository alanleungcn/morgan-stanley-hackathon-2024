import { useDeleteEvent } from "@/api/event/use-delete-event";
import { useEvents } from "@/api/event/use-events";
import { useNavigate } from "@tanstack/react-router";
import EventCard from "../event-card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ManageEvents = () => {
  const { data } = useEvents();

  // const [layout, setLayout] = useState<"grid" | "list">("list");

  const navigate = useNavigate();

  const { mutate: deleteEvent } = useDeleteEvent();

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1000px] flex-col gap-8 p-8">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <div className="flex gap-8">
          <Input placeholder="Search" />
          {/* <ToggleGroup
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
          </ToggleGroup> */}
        </div>

        <div className="flex flex-col gap-4">
          {data?.map((e) => (
            <EventCard
              key={e.eventId}
              event={e}
              buttonText="Edit"
              buttonAction={() => {}}
              // layout={layout}
              layout="grid"
            >
              <Button
                className="mb-2 w-full lg:w-32"
                onClick={() =>
                  navigate({ to: `/events/event-details/${e.eventId}` })
                }
              >
                Details
              </Button>
              {/* <Button className="mb-2 w-full lg:w-32" disabled>
                Edit
              </Button> */}
              <Button
                className="w-full lg:w-32"
                variant="destructive"
                onClick={() => deleteEvent(e.eventId)}
              >
                Delete
              </Button>
            </EventCard>
          ))}
        </div>
      </div>
    </div>
  );
};
