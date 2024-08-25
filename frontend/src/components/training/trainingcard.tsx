import TrainingModal from "@/components/training/trainingmodel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type TrainingCardProps = {
  title: string;
  description: string;
  videoSrc: string;
  tags: string[];
  children?: JSX.Element;
};

export const TrainingCard = ({
  title,
  description,
  videoSrc,
  tags,
  children,
}: TrainingCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        className="flex cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl lg:flex-row"
        onClick={handleCardClick}
      >
        <CardHeader className="rounded-t-lg p-0 lg:w-1/3 lg:rounded-l-lg lg:rounded-t-none">
          <iframe
            src={videoSrc}
            className="h-48 w-full rounded-t-lg object-cover lg:h-full lg:rounded-l-lg lg:rounded-t-none"
            title={title}
            allowFullScreen
            loading="lazy"
          />
        </CardHeader>
        <div className="flex flex-col lg:w-2/3">
          <CardHeader className="rounded-t-lg bg-gray-100 p-4 lg:rounded-r-lg lg:rounded-t-none">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <p className="h-24 overflow-hidden text-ellipsis text-gray-700">
              {description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-yellow-200 px-3 py-1 text-yellow-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div>{children}</div>
          </CardContent>
        </div>
      </Card>

      <TrainingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={title}
        description={description}
        videoSrc={videoSrc}
        tags={tags}
      />
    </>
  );
};
