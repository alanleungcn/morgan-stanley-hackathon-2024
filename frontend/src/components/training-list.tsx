import { useTrainings } from "@/api/training/use-trainings";
import { TrainingCard } from "@/components/training/trainingcard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";

export const TrainingList = () => {
  const { data: trainings, isSuccess } = useTrainings();

  return (
    isSuccess && (
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Elderly Assistance">
                Elderly Assistance
              </SelectItem>
              <SelectItem value="Food Distribution">
                Food Distribution
              </SelectItem>
              <SelectItem value="Community Health">Community Health</SelectItem>
              <SelectItem value="Mental Health">Mental Health</SelectItem>
            </SelectContent>
          </Select>
          <Input type="email" placeholder="Search" />
        </div>

        <div className="flex flex-col gap-4">
          {trainings.map((training, index) => (
            <TrainingCard
              key={index}
              title={training.courseName}
              description={training.courseDescription}
              videoSrc={training.courseUrl}
              tags={training.tags}
            />
          ))}
        </div>
      </div>
    )
  );
};
