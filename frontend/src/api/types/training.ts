import { z } from "zod";

export const zTraining = z.object({
  courseId: z.number(),
  courseName: z.string(),
  courseDescription: z.string(),
  courseUrl: z.string().url(),
});

export type Event = z.infer<typeof zTraining>;
