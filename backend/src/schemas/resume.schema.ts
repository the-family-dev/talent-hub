import { z } from "zod";
import { ExperienceLevel } from "@prisma/client";

export const ResumeIdSchema = z.object({
  id: z.uuid(),
});

export const GetResumesQuerySchema = z.object({
  search: z.string().optional(),
});

export const CreateUpdateResumeSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  salaryFrom: z.number().int().positive().optional().nullable(),
  salaryTo: z.number().int().positive().optional().nullable(),
  location: z.string().optional(),
  experienceLevel: z.enum(ExperienceLevel),
  userId: z.uuid(),
  tags: z.array(z.string()).optional(),
});

export type TCreateUpdateResumeInput = z.infer<typeof CreateUpdateResumeSchema>;
