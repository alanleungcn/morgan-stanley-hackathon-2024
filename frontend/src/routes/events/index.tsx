import { EventsList } from "@/components/events-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/")({
  component: Events,
});

function Events() {
  return (
    <div className="flex justify-center">
      <div className="md:max-w-[960px]">
        <EventsList />
      </div>
    </div>
  );
}
