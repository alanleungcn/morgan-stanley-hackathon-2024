import { Card } from "@/components/ui/card";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import { useEvents } from "@/api/event/use-events";
import { useUser } from "@/api/user/use-user";
import { useUsers } from "@/api/user/use-users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Register } from "@/components/user/register";
import { formatDateWithWeekday, formatTime } from "@/utils/date";
import { isSameDay } from "date-fns";
import { Calendar, ChevronLeft, Clock, HandHeart, User } from "lucide-react";

// interface Event {
//   event_id: number;
//   event_name: string;
//   event_date: string; // Assuming ISO string
//   event_location: string;
//   event_description: string;
//   number_of_participants: number;
//   number_of_volunteers: number;
//   number_of_participants_needed: number;
//   number_of_volunteers_needed: number;
//   event_type: string;
// }

export const Route = createFileRoute("/events/event-details/$event-id")({
  component: EventDetails,
});

function EventDetails() {
  const { "event-id": eventId } = Route.useParams();
  const { data: events } = useEvents();

  const event = events?.find((e) => e.eventId === parseInt(eventId));

  const { data: users } = useUsers();
  const { data: user, isSuccess } = useUser();

  // const { mutate: registerEvent } = useRegisterEvent();
  // const { mutate: registerEventVolunteer } = useRegisterEventVolunteer();

  const router = useRouter();

  return event ? (
    <div className="mx-auto space-y-8 px-4 py-4 pb-24 pt-8 sm:px-12">
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => router.history.back()}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-2">
        <div className="w-full pr-4 sm:w-1/2">
          <Card className="overflow-hidden">
            <img
              src={event.eventImageUrl}
              alt={event.eventName}
              className="h-auto max-h-96 w-full object-contain"
            />
          </Card>
        </div>
        <div className="w-full space-y-12 pl-4 sm:w-1/2">
          <h1 className="text-4xl font-bold">{event.eventName}</h1>
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Date and Time</h2>
            <div className="text-lg font-medium text-gray-700">
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
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDateWithWeekday(event.eventStartDate)} -{" "}
                  {formatDateWithWeekday(event.eventEndDate)}
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Location</h2>
            <p className="text-lg">{event.eventLocation}</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Open in Google Map
            </a>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">About this event</h2>
            <p className="text-lg">{event.eventDescription}</p>
          </div>
          <Register
            onRegister={(role) => {
              if (role === "participant") {
                // registerEvent(event.eventId);
              } else {
                // registerEventVolunteer(event.eventId);
              }
            }}
            event={event}
          />

          {isSuccess && user && user.isAdmin && (
            <div className="space-y-4">
              <Separator />
              <h2 className="text-2xl font-semibold">
                Participants & Volunteers
              </h2>
              <div className="flex flex-col gap-2">
                {users?.slice(0, 10).map(
                  (u) =>
                    !u.isAdmin && (
                      <div
                        key={u.userId}
                        className="flex items-center gap-4 rounded-md p-4 shadow"
                      >
                        <Avatar>
                          <AvatarImage src={u.avatarUrl} alt="" />
                          <AvatarFallback>{u.name}</AvatarFallback>
                        </Avatar>

                        <div className="w-32 text-ellipsis">{u.name}</div>

                        {Math.random() >= 0.5 ? (
                          <span className="ml-auto flex items-center gap-2">
                            <HandHeart className="h-4 w-4" />
                            Volunteer
                          </span>
                        ) : (
                          <span className="ml-auto flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Participant
                          </span>
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
