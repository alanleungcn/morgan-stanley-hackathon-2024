import { TrainingList } from "@/components/training-list";
import { createFileRoute } from "@tanstack/react-router";

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
