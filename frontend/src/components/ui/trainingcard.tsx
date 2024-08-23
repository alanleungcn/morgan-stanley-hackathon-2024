import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TrainingCardProps = {
  title: string;
  description: string;
  videoSrc: string;
  tags: string[];
};

export const TrainingCard = ({ title, description, videoSrc, tags }: TrainingCardProps) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleButtonClick = () => {
    setIsCompleted(true);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg lg:flex-row hover:shadow-xl">
      <CardHeader className="p-0 rounded-t-lg lg:w-1/3 lg:rounded-t-none lg:rounded-l-lg">
        <iframe
          src={videoSrc}
          className="object-cover w-full h-48 rounded-t-lg lg:h-full lg:rounded-t-none lg:rounded-l-lg"
          title={title}
          allowFullScreen
        />
      </CardHeader>
      <div className="flex flex-col lg:w-2/3">
        <CardHeader className="p-4 bg-gray-100 rounded-t-lg lg:rounded-t-none lg:rounded-r-lg">
          <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <p className="h-24 overflow-hidden text-gray-700 text-ellipsis">{description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 text-yellow-800 bg-yellow-200 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-gray-100 rounded-b-lg lg:rounded-b-none lg:rounded-r-lg">
          <Button
            className={`w-full lg:w-32 ${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white`}
            onClick={handleButtonClick}
          >
            {isCompleted ? 'Completed' : 'Watch'}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
