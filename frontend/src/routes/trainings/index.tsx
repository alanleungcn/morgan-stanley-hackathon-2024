import { createFileRoute } from "@tanstack/react-router";
import { TrainingList } from "@/components/training-list";

export const Route = createFileRoute("/trainings/")({
  component: Training,
});

function Training() {
  return (
    <div className="p-8">
      <TrainingList />
    </div>
  );
}
