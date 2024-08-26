import { EventsList } from "@/components/events-list";
import { Hero } from "@/components/hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="mx-auto max-w-[1000px]">
        <EventsList />
      </div>
    </div>
  );
}
