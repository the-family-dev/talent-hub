import { z } from "zod";
import { ApplicationStatus, ExperienceLevel } from "@prisma/client";

export const ApplicationIdSchema = z.object({
  id: z.uuid(),
});

export const CreateApplicationSchema = z.object({
  resumeId: z.uuid(),
  vacancyId: z.uuid(),
  note: z.string().optional(),
});

export const PublicApplicationCreateSchema = z.object({
  vacancyId: z.uuid(),
  title: z.string().min(1, "Название обязательное").max(255),
  note: z.string().optional(),
  name: z.string().min(1, "Имя пользователя обязательно").max(255),
  phone: z.string(),
  email: z.email("Некорректный формат email").optional(),
  telegram: z.string().optional(),
  description: z.string().optional(),
  experienceLevel: z.enum(ExperienceLevel),
});

export type TPublicApplicationCreateInput = z.infer<
  typeof PublicApplicationCreateSchema
>;
export type TApplicationCreateInput = z.infer<typeof CreateApplicationSchema>;

export const UpdateApplicationSchema = z.object({
  status: z.enum(ApplicationStatus).optional(),
  note: z.string().optional(),
});

export type TUpdateApplicationInput = z.infer<typeof UpdateApplicationSchema>;

export const GetApplicationsBodySchema = z.object({
  resumeId: z.uuid().optional(),
  vacancyId: z.uuid().optional(),
  status: z.enum(ApplicationStatus).optional(),
});
