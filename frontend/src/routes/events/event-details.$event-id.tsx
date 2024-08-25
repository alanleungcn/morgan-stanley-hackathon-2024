import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import { useEvents } from "@/api/event/use-events";
import { Register } from "@/components/user/register";
import { formatDateWithWeekday, formatTime } from "@/utils/date";
import { isSameDay } from "date-fns";
import { Calendar, Clock } from "lucide-react";

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

  // const { mutate: registerEvent } = useRegisterEvent();
  // const { mutate: registerEventVolunteer } = useRegisterEventVolunteer();

  return event ? (
    <div className="container mx-auto space-y-8 px-24 py-4 pb-24 pt-16">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <Card className="overflow-hidden">
            <img
              src={event.eventImageUrl}
              alt={event.eventName}
              className="h-auto max-h-96 w-full object-contain"
            />
          </Card>
        </div>
        <div className="w-1/2 space-y-12 pl-4">
          <h1 className="text-4xl font-bold">{event.eventName}</h1>
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Date and Time</h2>
            <p className="text-lg font-medium text-gray-700">
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
            </p>
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
        </div>
      </div>
    </div>
  ) : null;
}
