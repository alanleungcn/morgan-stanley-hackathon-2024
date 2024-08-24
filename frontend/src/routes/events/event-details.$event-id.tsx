import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";

import { Register } from "@/components/user/register";
import { useEventDetails } from "@/api/event/use-event-details";

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
  const { data: event } = useEventDetails();

  // const formatDate = (dateString: string) => {
  //   const options: Intl.DateTimeFormatOptions = {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     timeZoneName: "short",
  //   };
  //   return new Date(dateString).toLocaleDateString("en-US", options);
  // };

  // const handleRegister = (role: string) => {
  //   setEvent((prevEvent) => {
  //     if (role === "participant") {
  //       return {
  //         ...prevEvent,
  //         number_of_participants: prevEvent.number_of_participants + 1,
  //       };
  //     }
  //     return {
  //       ...prevEvent,
  //       number_of_volunteers: prevEvent.number_of_volunteers + 1,
  //     };
  //   });
  // };

  return event ? (
    <div className="container mx-auto px-24 py-4 space-y-8 pb-24">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <Card className="overflow-hidden">
            <img
              src="/event-poster-1.jpg"
              alt={event.eventName}
              className="w-full h-auto max-h-96 object-contain"
            />
          </Card>
        </div>
        <div className="w-1/2 pl-4 space-y-12">
          <h1 className="text-4xl font-bold">{event.eventName}</h1>
          <div>
            <h2 className="text-2xl font-semibold flex items-center">
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
