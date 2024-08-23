import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/trainings/")({
  component: Training,
});

function Training() {
  return <div>Training</div>;
}
