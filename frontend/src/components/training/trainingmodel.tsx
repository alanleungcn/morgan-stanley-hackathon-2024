import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  videoSrc: string;
  tags: string[];
};

const TrainingModal = ({
  isOpen,
  onClose,
  title,
  description,
  videoSrc,
  tags,
}: ModalProps) => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const savedCompletionStatus = localStorage.getItem(`completed-${title}`);
    setIsCompleted(savedCompletionStatus === "true");
  }, [title]);

  const handleCompleteClick = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    localStorage.setItem(`completed-${title}`, newStatus.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[90vh] w-full max-w-6xl flex-col rounded-lg p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {title}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="relative mb-2 flex-grow">
          <iframe
            src={videoSrc}
            className="mx-auto h-full w-3/4 rounded-lg"
            title={title}
            allowFullScreen
          />
        </div>
        <div className="mx-auto mb-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-yellow-200 px-3 py-1 text-yellow-800"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mx-auto">
          <Button
            onClick={handleCompleteClick}
            className={`mb-3 w-[90%] ${
              isCompleted
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-600 hover:bg-yellow-700"
            } px-4 py-2 text-white`}
          >
            {isCompleted ? "Completed" : "Complete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrainingModal;
