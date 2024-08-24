import {
  BriefcaseBusiness,
  Dices,
  HandHeart,
  PartyPopper,
  PencilRuler,
} from "lucide-react";
import { Button } from "./ui/button";

export const EventTags = () => {
  return (
    <div className="scrollbar-hide flex gap-8 gap-y-2 overflow-x-scroll pl-4 sm:justify-center sm:gap-x-16">
      <Button
        variant="ghost"
        className="flex h-16 w-16 flex-col gap-2 sm:h-24 sm:w-24"
      >
        <PartyPopper className="h-6 w-6 sm:h-8 sm:w-8" />
        <p className="text-xs sm:text-sm">Gathering</p>
      </Button>

      <Button
        variant="ghost"
        className="flex h-16 w-16 flex-col gap-2 sm:h-24 sm:w-24"
      >
        <HandHeart className="h-6 w-6 sm:h-8 sm:w-8" />
        <p className="text-xs sm:text-sm">Counselling</p>
      </Button>

      <Button
        variant="ghost"
        className="flex h-16 w-16 flex-col gap-2 sm:h-24 sm:w-24"
      >
        <BriefcaseBusiness className="h-6 w-6 sm:h-8 sm:w-8" />
        <p className="text-xs sm:text-sm">Career</p>
      </Button>

      <Button
        variant="ghost"
        className="flex h-16 w-16 flex-col gap-2 sm:h-24 sm:w-24"
      >
        <PencilRuler className="h-6 w-6 sm:h-8 sm:w-8" />
        <p className="text-xs sm:text-sm">Workshop</p>
      </Button>

      <Button
        variant="ghost"
        className="flex h-16 w-16 flex-col gap-2 sm:h-24 sm:w-24"
      >
        <Dices className="h-6 w-6 sm:h-8 sm:w-8" />
        <p className="text-xs sm:text-sm">Others</p>
      </Button>
    </div>
  );
};
