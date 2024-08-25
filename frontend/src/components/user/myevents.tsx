// import React from "react";
// import { useUserEvents } from "@/api/user/use-userevents";
// import { Event } from "@/api/types/event";

// export const Myevents: React.FC<{ userId: number }> = ({ userId }) => {
//   const { data: events, isLoading, error } = useUserEvents(userId);

//   if (isLoading) return <p>Loading events...</p>;
//   if (error) return <p>Error loading events: {error.message}</p>;

//   return (
//     <div>
//       <h2>Registered Events</h2>
//       <ul>
//         {events?.map((event: Event) => (
//           <li key={event.eventId}>{event.eventName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export const Myevents = () => {
//   return <div>Volunteered Events</div>;
// };
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Event {
  title: string;
  imageUrl: string;
  date: string;
  location: string;
}

const dummyEvents: Event[] = [
  {
    title: "Community Cleanup",
    imageUrl: "https://media.istockphoto.com/id/1169987255/vector/group-of-children-cleaning-up-city-park.jpg?s=612x612&w=0&k=20&c=JRsQQT-uhKP8MSWRJrik9sFPXOiPXxammzXHNybWJlI=",
    date: "2024-09-10",
    location: "Victoria Park, Causeway Bay",
  },
  {
    title: "Food Drive",
    imageUrl: "https://www.tafthighschool.org/ourpages/auto/2019/11/15/39830901/helping%20hands%20food%20drive.jpg?1573823740000",
    date: "2024-07-15",
    location: "Central Market, Central",
  },
  {
    title: "Health Fair",
    imageUrl: "https://blogimage.vantagefit.io/vfitimages/2020/02/Employee-Health-Fair-Ideas-1.png",
    date: "2024-07-09",
    location: "Exhibition Centre, Kowloon Bay",
  },
  {
    title: "Healthy Run",
    imageUrl: "https://www.justfundraising.com/blog/wp-content/uploads/2020/06/marathon-fundraising-ideas.png",
    date: "2024-02-05",
    location: "Hong Kong Park, Admiralty",
  },
  {
    title: "Blood Donation",
    imageUrl: "https://miro.medium.com/v2/resize:fit:1400/1*LrRIFrplsmGYko_JImnUHw.jpeg",
    date: "2024-01-15",
    location: "Hong Kong Red Cross, Wan Chai",
  },
];

export const Myevents = () => {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>(dummyEvents);

  const handleUnregister = (index: number) => {
    setRegisteredEvents((prevEvents) =>
      prevEvents.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="grid grid-cols-2 gap-4 overflow-y-auto">
        {registeredEvents.length > 0 ? (
          registeredEvents.map((event, index) => (
            <Card key={index} className="w-full bg-white shadow-md">
              <CardHeader>
              <img
                  src={event.imageUrl}
                  alt={event.title}
                  loading="lazy"
                  className="object-cover w-full h-32 rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-xs text-gray-500">{event.date}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleUnregister(index)}
                  className="text-white bg-red-500"
                >
                  Unregister
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-600">
            No events registered yet.
          </p>
        )}
      </div>
    </div>
  );
};
