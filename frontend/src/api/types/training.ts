import { z } from "zod";

export const zTraining = z.object({
  courseId: z.number(),
  courseName: z.string(),
  courseDescription: z.string(),
  courseUrl: z.string().url(),
  tags: z.array(z.string()),
});

export const zTrainingConstruct = zTraining.omit({
  courseId: true,
});

export type Training = z.infer<typeof zTraining>;
export type TrainingConstruct = z.infer<typeof zTrainingConstruct>;
