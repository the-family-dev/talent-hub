import { z } from "zod";
import { ApplicationStatus } from "@prisma/client";

export const ApplicationIdSchema = z.object({
  id: z.string().uuid(),
});

export const CreateApplicationSchema = z.object({
  resumeId: z.uuid(),
  vacancyId: z.uuid(),
  note: z.string().optional(),
});

export type TCreateApplicationInput = z.infer<typeof CreateApplicationSchema>;

export const UpdateApplicationSchema = z.object({
  status: z.enum(ApplicationStatus).optional(),
  note: z.string().optional(),
});

export type TUpdateApplicationInput = z.infer<typeof UpdateApplicationSchema>;

export const GetApplicationsQuerySchema = z.object({
  resumeId: z.uuid().optional(),
  vacancyId: z.uuid().optional(),
  status: z.enum(ApplicationStatus).optional(),
});
