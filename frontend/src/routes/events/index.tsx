import { EventsList } from "@/components/events-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/")({
  component: Events,
});

function Events() {
  return (
    <div className="flex justify-center">
      <div className="p-8 md:max-w-[1280px]">
        <EventsList />
      </div>
    </div>
  );
}
