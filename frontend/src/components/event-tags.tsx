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
    <div className="flex overflow-x-scroll scrollbar-hide sm:justify-center pl-4 gap-8 sm:gap-x-16 gap-y-2">
      <Button
        variant="ghost"
        className="flex flex-col w-16 h-16 sm:w-24 sm:h-24 gap-2"
      >
        <PartyPopper className="w-6 h-6 sm:w-8 sm:h-8" />
        <p className="text-xs sm:text-sm">Gathering</p>
      </Button>

      <Button
        variant="ghost"
        className="flex flex-col w-16 h-16 sm:w-24 sm:h-24 gap-2"
      >
        <HandHeart className="w-6 h-6 sm:w-8 sm:h-8" />
        <p className="text-xs sm:text-sm">Counselling</p>
      </Button>

      <Button
        variant="ghost"
        className="flex flex-col w-16 h-16 sm:w-24 sm:h-24 gap-2"
      >
        <BriefcaseBusiness className="w-6 h-6 sm:w-8 sm:h-8" />
        <p className="text-xs sm:text-sm">Career</p>
      </Button>

      <Button
        variant="ghost"
        className="flex flex-col w-16 h-16 sm:w-24 sm:h-24 gap-2"
      >
        <PencilRuler className="w-6 h-6 sm:w-8 sm:h-8" />
        <p className="text-xs sm:text-sm">Workshop</p>
      </Button>

      <Button
        variant="ghost"
        className="flex flex-col w-16 h-16 sm:w-24 sm:h-24 gap-2"
      >
        <Dices className="w-6 h-6 sm:w-8 sm:h-8" />
        <p className="text-xs sm:text-sm">Others</p>
      </Button>
    </div>
  );
};
