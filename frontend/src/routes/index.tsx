import { EventTags } from "@/components/event-tags";
import { EventsList } from "@/components/events-list";
import { Hero } from "@/components/hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <EventTags />
      <div className="container">
        <EventsList />
      </div>
    </div>
  );
}
