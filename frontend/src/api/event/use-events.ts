import { apiClient } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { add } from "date-fns";

export interface Event {
  imageURL: string;
  eventId: number;
  eventName: string;
  eventStartDate: Date;
  eventEndDate: Date;
  eventLocation: string;
  eventDescription: string;
  numberOfParticipants: number;
  numberOfVolunteers: number;
  numberOfParticipantsNeeded: number;
  numberOfVolunteersNeeded: number;
  eventType: string;
  reviews: number[];
}

export function useEvents() {
  const dummy: { data: Event[] } = {
    data: [
      {
        imageURL:
          "https://scontent.fhkg4-2.fna.fbcdn.net/v/t39.30808-6/456482713_517800687288809_586040857118645296_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pOOrEOQe-78Q7kNvgG2Wz8v&_nc_ht=scontent.fhkg4-2.fna&oh=00_AYDa4SivfQLn7bmQRJ9Udtkng8YL6xw_es-laxlvXXB7yQ&oe=66CF58A7",
        eventId: 0,
        eventName:
          "Opportunity x The Zubin Foundation Sub-degree & Undergraduate Scholarships",
        eventStartDate: new Date(),
        eventEndDate: add(new Date(), { hours: 1 }),
        eventLocation: "Hong Kong",
        eventDescription: "some description",
        numberOfParticipants: 50,
        numberOfVolunteers: 50,
        numberOfParticipantsNeeded: 100,
        numberOfVolunteersNeeded: 100,
        eventType: "Social Gathering",
        reviews: [0, 1, 2, 3, 4, 5],
      },
    ],
  };

  return dummy;

  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await apiClient.get(`/events`);
      return response.data;
    },
  });
}
