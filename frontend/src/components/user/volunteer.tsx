import { HandHelping } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface VolunteerEvent {
  title: string;
  imageUrl: string;
  location: string;
  date: string;
}

const volunteerEvents: VolunteerEvent[] = [
  {
    title: "Community Cleanup",
    imageUrl: "https://media.istockphoto.com/id/1169987255/vector/group-of-children-cleaning-up-city-park.jpg?s=612x612&w=0&k=20&c=JRsQQT-uhKP8MSWRJrik9sFPXOiPXxammzXHNybWJlI=",
    location: "Central, Hong Kong",
    date: "2024-08-10",
  },
  {
    title: "Youth Mentorship",
    imageUrl: "https://miro.medium.com/v2/resize:fit:1400/0*7Nbr9hOmeK7GW1cq.jpg",
    location: "Kowloon, Hong Kong",
    date: "2024-08-01",
  },
  {
    title: "Community Kitchen",
    imageUrl: "https://www.shutterstock.com/image-vector/illustration-icon-concept-community-that-600nw-2243576167.jpg",
    location: "Mong Kok, Hong Kong",
    date: "2024-07-29",
  },
  {
    title: "Senior Citizen Support",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/023/057/646/original/a-nurse-helps-an-elderly-woman-old-lady-s-support-graphics-vector.jpg",
    location: "Wan Chai, Hong Kong",
    date: "2024-06-20",
  },
];

export const Volunteered = () => {
  const [events, setEvents] = useState<VolunteerEvent[]>(volunteerEvents);

  const handleRemoveEvent = (title: string) => {
    setEvents(events.filter(event => event.title !== title));
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="grid grid-cols-2 gap-4 overflow-y-auto">
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event.title} className="w-full bg-white shadow-md">
              <CardHeader>
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="object-cover w-full h-32 rounded-t-lg"
                  loading="lazy"
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-xs text-gray-500">{event.date}</p>
              </CardContent>
              <CardFooter>
                <HandHelping
                  className="text-2xl text-green-500 cursor-pointer"
                  onClick={() => handleRemoveEvent(event.title)}
                />
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600">No volunteer events available.</p>
        )}
      </div>
    </div>
  );
};
