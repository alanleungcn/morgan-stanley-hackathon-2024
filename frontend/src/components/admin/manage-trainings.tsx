import { useDeleteTraining } from "@/api/training/use-delete-training";
import { useTrainings } from "@/api/training/use-trainings";
import { TrainingCard } from "../training/trainingcard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ManageTrainings = () => {
  const { data: trainings, isSuccess } = useTrainings();
  const { mutate: deleteTraining } = useDeleteTraining();

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1000px] flex-col gap-8 p-8">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <div className="flex gap-8">
          <Input placeholder="Search" />
        </div>

        <div className="space-y-4">
          {isSuccess &&
            trainings?.map((t) => (
              <TrainingCard
                key={t.courseId}
                description={t.courseDescription}
                tags={t.tags}
                title={t.courseName}
                videoSrc={t.courseUrl}
              >
                <Button
                  className="mt-4 w-full"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTraining(t.courseId);
                  }}
                >
                  Delete
                </Button>
              </TrainingCard>
            ))}
        </div>
      </div>
    </div>
  );
};
