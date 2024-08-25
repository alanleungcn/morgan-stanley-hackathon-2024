import { Event } from "@/api/types/event";
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
  children?: React.ReactNode;
};

export default function EventCard({
  event,
  layout,
  className,
  // buttonText,
  // buttonAction,
  children,
}: Props) {
  return (
    <Card
      className={cn(
        className,
        layout === "grid" ? "flex flex-col" : "flex h-64 flex-row",
      )}
    >
      <CardHeader
        className={cn(
          "overflow-hidden p-0",
          layout === "grid" ? "h-32" : "w-1/3",
        )}
      >
        <img src={event.eventImageUrl} className="h-full w-full object-cover" />
      </CardHeader>

      <div
        className={cn(
          layout === "grid"
            ? "flex h-2/3 flex-col"
            : "flex w-2/3 flex-col justify-between",
        )}
      >
        <CardTitle className="p-4 pb-0 text-sm sm:px-6 sm:text-xl">
          {event.eventName}
        </CardTitle>
        <CardContent className="h-24 overflow-y-hidden text-ellipsis p-4 pt-0 text-sm sm:px-6 sm:text-base">
          {event.eventDescription}
        </CardContent>
        <CardFooter className="px-4 sm:px-6">
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
                <div className="flex items-center gap-2 text-sm">
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
            <div className="mt-auto w-full lg:w-32">
              {children}
              {/* <Button className="w-full lg:w-32" onClick={buttonAction}>
                {buttonText}
              </Button> */}
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
