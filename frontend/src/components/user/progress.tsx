import { useState, useEffect } from 'react';

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

// Custom hook to fetch completed trainings
const useCompletedTrainings = () => {
  const [completedTrainings, setCompletedTrainings] = useState<Training[]>([]);

  useEffect(() => {
    const fetchCompletedTrainings = () => {
      const completed = allTrainings.filter(training => {
        const completedStatus = localStorage.getItem(`completed-${training.title}`);
        return completedStatus === 'true';
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
      <div className="grid grid-cols-2 gap-4 overflow-y-auto h-[calc(70vh-4rem)]">
        {completedTrainings.length > 0 ? (
          completedTrainings.map((training) => (
            <div key={training.title} className="overflow-hidden bg-white rounded-lg shadow-md">
              <iframe
                src={training.videoSrc}
                className="w-full h-40"
                title={training.title}
                allowFullScreen
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{training.title}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-600">No completed trainings yet.</p>
        )}
      </div>
    </div>
  );
};
