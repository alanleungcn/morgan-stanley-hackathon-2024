import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "./ui/input";
import { TrainingCard } from "@/components/ui/trainingcard";

export const TrainingList = () => {
  const trainings = [
    {
      title: "Elderly Assistance",
      description: "Learn how to assist elderly individuals in the community.",
      videoSrc: "https://www.youtube.com/embed/-rB5-AkqpjQ",
      tags: ["Community", "Assistance", "Elderly"],
    },
    {
      title: "Food Distribution",
      description: "Help distribute food to those in need in the community.",
      videoSrc: "https://www.youtube.com/embed/xDPL-_Op87o",
      tags: ["Community", "Food", "Charity"],
    },
    {
      title: "Mental Health Support",
      description: "Training on providing mental health support to those in need.",
      videoSrc: "https://www.youtube.com/embed/FgNRE44coVU",
      tags: ["Health", "Support", "Mental Health"],
    },
    {
      title: "Youth Mentoring",
      description: "Guidance and support for mentoring young individuals in the community.",
      videoSrc: "https://www.youtube.com/embed/Uv8a6RiFZ2E",
      tags: ["Youth", "Mentoring", "Community"],
    },
    {
      title: "Disaster Response Training",
      description: "Learn how to effectively respond to and manage disaster situations.",
      videoSrc: "https://www.youtube.com/embed/tjyJUlif5Lg",
      tags: ["Disaster", "Response", "Training"],
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Elderly Assistance">Elderly Assistance</SelectItem>
            <SelectItem value="Food Distribution">Food Distribution</SelectItem>
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
            title={training.title}
            description={training.description}
            videoSrc={training.videoSrc}
            tags={training.tags}
          />
        ))}
      </div>
    </div>
  );
};
