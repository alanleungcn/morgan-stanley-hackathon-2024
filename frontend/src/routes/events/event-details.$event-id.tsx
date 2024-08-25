import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import { useEvents } from "@/api/event/use-events";
import { Register } from "@/components/user/register";

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

  return event ? (
    <div className="container mx-auto space-y-8 px-24 py-4 pb-24">
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
            <h2 className="flex items-center text-2xl font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#3A3247"
                viewBox="0 0 24 24"
                className="mr-2"
              >
                <path
                  d="M17 11h2V6h-2V4h-2v2H9V4H7v2H5v13h6v-2H7v-7h10zm0 1c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4m-.6 5.9 2.9-2.9-.9-.9-2.1 2.1-.7-.8-.8.8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Date and Time
            </h2>
            <p className="text-lg font-medium text-gray-700">
              {/* {formatDate(event.eventStartDate)} */}
              dummy date
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
              Show map
            </a>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">About this event</h2>
            <p className="text-lg">{event.eventDescription}</p>
          </div>
          <Register onRegister={() => {}} event={event} />
        </div>
      </div>
    </div>
  ) : null;
}
