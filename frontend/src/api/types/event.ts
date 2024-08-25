import { z } from "zod";

export const zEvent = z.object({
  eventId: z.number(),
  eventName: z.string(),
  eventStartDate: z.date(),
  eventEndDate: z.date(),
  eventLocation: z.string(),
  eventDescription: z.string(),
  numberOfParticipants: z.number(),
  numberOfVolunteers: z.number(),
  numberOfParticipantsNeeded: z.number(),
  numberOfVolunteersNeeded: z.number(),
  eventType: z.string(),
  eventImageUrl: z.string().url(),
  reviews: z.array(z.number()),
});

export const zEvents = z.array(zEvent);

export const zEventConstruct = zEvent.omit({
  eventId: true,
  numberOfParticipants: true,
  numberOfVolunteers: true,
  reviews: true,
});

export const zEventTags = z.array(z.string());

export type Event = z.infer<typeof zEvent>;
export type Events = z.infer<typeof zEvents>;
export type EventConstruct = z.infer<typeof zEventConstruct>;
export type EventTags = z.infer<typeof zEventTags>;
