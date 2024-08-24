import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, UsersRound } from "lucide-react";
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
  layout,
  className,
  buttonText,
  buttonAction,
}: Props) {
  return layout === "grid" ? (
    <Card className={cn(className)}>
      <CardHeader className="p-0">
        <img src={event.imageURL} className="h-48 object-cover" />
        <CardTitle className="p-6">{event.eventName}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p className="text-ellipsis overflow-hidden">
          {event.eventDescription}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between items-end flex-col lg:flex-row gap-4">
          <div className="flex flex-col">
            {isSameDay(event.eventStartDate, event.eventEndDate) ? (
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDateWithWeekday(event.eventStartDate)}
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {formatTime(event.eventStartDate)} -{" "}
                  {formatTime(event.eventEndDate)}
                </div>
              </div>
            ) : (
              <div>multi-day event</div>
            )}
            <div className="flex gap-2 items-center">
              <UsersRound className="w-4 h-4" />
              {event.numberOfParticipants} / {event.numberOfParticipantsNeeded}{" "}
              participants
            </div>
          </div>
          <div className="w-full lg:w-32">
            <Button className="w-full lg:w-32" onClick={buttonAction}>
              {buttonText}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  ) : (
    <Card className={cn(className, "flex flex-row")}>
      <CardHeader className="p-0 flex-row">
        <img src={event.imageURL} className="w-64 object-cover" />
      </CardHeader>
      <div className="">
        <CardTitle className="p-6">{event.eventName}</CardTitle>
        <CardContent>{event.eventDescription}</CardContent>
        <CardFooter>
          <div className="flex w-full justify-between items-end flex-col lg:flex-row gap-4">
            <div className="flex flex-col">
              {isSameDay(event.eventStartDate, event.eventEndDate) ? (
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDateWithWeekday(event.eventStartDate)}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formatTime(event.eventStartDate)} -{" "}
                    {formatTime(event.eventEndDate)}
                  </div>
                </div>
              ) : (
                <div>multi-day event</div>
              )}
              <div className="flex gap-2 items-center">
                <UsersRound className="w-4 h-4" />
                {event.numberOfParticipants} /{" "}
                {event.numberOfParticipantsNeeded} participants
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
