import {
  BriefcaseBusiness,
  GraduationCap,
  InspectionPanel,
  PartyPopper,
  Siren,
} from "lucide-react";
import { Button } from "./ui/button";

export const EventTags = () => {
  return (
    <div className="container flex justify-around max-w-[1200px]">
      <Button
        className="rounded-full flex flex-col w-28 h-28 gap-1"
        variant="outline"
      >
        <InspectionPanel size={32} />
        <p className="">Mental</p>
      </Button>

      <Button
        className="rounded-full flex flex-col w-28 h-28 gap-1"
        variant="outline"
      >
        <PartyPopper size={32} />
        <p className="">Gathering</p>
      </Button>

      <Button
        className="rounded-full flex flex-col w-28 h-28 gap-1"
        variant="outline"
      >
        <BriefcaseBusiness size={32} />
        <p className="">Internship</p>
      </Button>

      <Button
        className="rounded-full flex flex-col w-28 h-28 gap-1"
        variant="outline"
      >
        <GraduationCap size={32} />
        <p className="">Education</p>
      </Button>

      <Button
        className="rounded-full flex flex-col w-28 h-28 gap-1"
        variant="outline"
      >
        <Siren size={32} />
        <p className="">Emergency</p>
      </Button>
    </div>
  );
};
