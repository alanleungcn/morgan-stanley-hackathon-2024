import { z } from "zod";

export const zUser = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  isAdmin: z.boolean(),
  avatarUrl: z.string().url(),
  email: z.string(),
  name: z.string(),
  dateOfBirth: z.date(),
  phoneNumber: z.string(),
  numberOfParticipated_events: z.number(),
  preferredEventType: z.string(),
  events: z.array(z.string()),
});

export const zLogin = zUser
  .pick({
    email: true,
  })
  .or(
    zUser.pick({
      phoneNumber: true,
    }),
  )
  .and(
    zUser.pick({
      password: true,
    }),
  );

export const zRegister = zUser.pick({
  phoneNumber: true,
  email: true,
  password: true,
  dateOfBirth: true,
});

export type Event = z.infer<typeof zUser>;
export type Login = z.infer<typeof zLogin>;
