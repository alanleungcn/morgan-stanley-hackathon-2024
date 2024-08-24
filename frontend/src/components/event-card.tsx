import { Event } from "@/api/event/use-events";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDateWithWeekday, formatTime } from "@/utils/date";
import { isSameDay } from "date-fns";
import { Calendar, Clock, Contact, UsersRound } from "lucide-react";

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
      <CardHeader className="w-1/3 overflow-hidden p-0">
        <img src={event.imageURL} className="h-full w-full object-contain" />
      </CardHeader>
      <div className="w-2/3">
        <CardTitle className="p-4 text-sm sm:p-6 sm:text-xl">
          {event.eventName}
        </CardTitle>
        <CardContent className="p-4 pt-0 text-sm sm:text-base">
          {event.eventDescription}
        </CardContent>
        <CardFooter className="px-4">
          <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row">
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

              <div className="flex items-center gap-2 text-sm">
                <UsersRound className="h-4 w-4" />
                {event.numberOfParticipants} /{" "}
                {event.numberOfParticipantsNeeded} participants
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Contact className="h-4 w-4" />
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
