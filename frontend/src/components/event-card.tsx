import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Contact, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/api/event/use-events";
import { isSameDay } from "date-fns";
import { formatDateWithWeekday, formatTime } from "@/utils/date";
import { cn } from "@/lib/utils";

type Props = {
  event: Event;
  layout: "grid" | "list";
  className?: React.ComponentProps<"div">["className"];
  buttonAction: () => void;
  buttonText: string;
};

export default function EventCard({
  event,
  // layout,
  className,
  buttonText,
  buttonAction,
}: Props) {
  return (
    <Card className={cn(className, "flex flex-row")}>
      <CardHeader className="p-0 w-1/3 overflow-hidden">
        <img src={event.imageURL} className="w-full h-full object-contain" />
      </CardHeader>
      <div className="w-2/3">
        <CardTitle className="p-4 sm:p-6 text-sm sm:text-xl">
          {event.eventName}
        </CardTitle>
        <CardContent className="p-4 pt-0 text-sm sm:text-base">
          {event.eventDescription}
        </CardContent>
        <CardFooter className="px-4">
          <div className="flex w-full justify-between items-start flex-col lg:flex-row gap-4">
            <div className="flex flex-col">
              {isSameDay(event.eventStartDate, event.eventEndDate) ? (
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    {formatDateWithWeekday(event.eventStartDate)}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    {formatTime(event.eventStartDate)} -{" "}
                    {formatTime(event.eventEndDate)}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDateWithWeekday(event.eventStartDate)} -{" "}
                  {formatDateWithWeekday(event.eventEndDate)}
                </div>
              )}

              <div className="flex gap-2 items-center text-sm">
                <UsersRound className="w-4 h-4" />
                {event.numberOfParticipants} /{" "}
                {event.numberOfParticipantsNeeded} participants
              </div>

              <div className="flex gap-2 items-center text-sm">
                <Contact className="w-4 h-4" />
                {event.numberOfVolunteers} / {event.numberOfVolunteersNeeded}{" "}
                volunteers
              </div>
            </div>
            <div className="w-full lg:w-32">
              <Button className="w-full lg:w-32" onClick={buttonAction}>
                {buttonText}
              </Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
