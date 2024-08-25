import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Training {
  title: string;
  videoSrc: string;
}

const allTrainings: Training[] = [
  {
    title: "Elderly Assistance",
    videoSrc: "https://www.youtube.com/embed/-rB5-AkqpjQ",
  },
  {
    title: "Food Distribution",
    videoSrc: "https://www.youtube.com/embed/xDPL-_Op87o",
  },
  {
    title: "Mental Health Support",
    videoSrc: "https://www.youtube.com/embed/FgNRE44coVU",
  },
  {
    title: "Youth Mentoring",
    videoSrc: "https://www.youtube.com/embed/Uv8a6RiFZ2E",
  },
  {
    title: "Disaster Response Training",
    videoSrc: "https://www.youtube.com/embed/tjyJUlif5Lg",
  },
];

const useCompletedTrainings = () => {
  const [completedTrainings, setCompletedTrainings] = useState<Training[]>([]);

  useEffect(() => {
    const fetchCompletedTrainings = () => {
      const completed = allTrainings.filter((training) => {
        const completedStatus = localStorage.getItem(`completed-${training.title}`);
        return completedStatus === "true";
      });
      setCompletedTrainings(completed);
    };

    fetchCompletedTrainings();
  }, []);

  return completedTrainings;
};

export const Progress = () => {
  const completedTrainings = useCompletedTrainings();

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="grid grid-cols-2 gap-4 overflow-y-auto">
        {completedTrainings.length > 0 ? (
          completedTrainings.map((training, index) => (
            <Card key={index} className="w-full bg-white shadow-md">
              <CardHeader>
                <iframe
                  src={training.videoSrc}
                  className="object-cover w-full h-32 rounded-t-lg"
                  title={training.title}
                  loading="lazy"
                  allowFullScreen
                />
              </CardHeader>
              <CardContent>
                <CardTitle>
                  {training.title}
                </CardTitle>
              </CardContent>
              <CardFooter className="p-2 m-3">
                <CheckCircle className="text-2xl text-green-500" />
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-1 text-center text-gray-600">
            No completed trainings yet.
          </p>
        )}
      </div>
    </div>
  );
};
