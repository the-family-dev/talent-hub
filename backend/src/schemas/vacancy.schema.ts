import { z } from "zod";
import { EmploymentType, ExperienceLevel, VacancyStatus } from "@prisma/client";

// ID параметра (для URL параметров)
export const VacancyIdSchema = z.object({
  id: z.uuid("Некорректный формат ID"),
});

export const CreateUpdateVacancySchema = z.object({
  title: z.string().min(2, "Название обязательно").max(255),
  description: z.string().optional(),
  salaryFrom: z.number().int().positive().optional().nullable(),
  salaryTo: z.number().int().positive().optional().nullable(),
  employmentType: z.enum(EmploymentType),
  experienceLevel: z.enum(ExperienceLevel),
  location: z.string().optional(),
  isRemote: z.boolean().default(false),
  companyId: z.uuid(),
  tags: z.array(z.string()).optional(),
  status: z.enum(VacancyStatus).optional(),
  // closeDate: z.string().optional(),
});

export const GetVacanciesBodySchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(VacancyStatus).optional(),
  companyId: z.uuid("Некорректный формат companyId").optional(),
});

export const LinkInternshipSchema = z.object({
  vacancyId: z.uuid(),
  internshipId: z.uuid(),
});

export const SearchVacanciesBodySchema = z.object({
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const UpdateStatusBodySchema = z.object({
  status: z.enum(VacancyStatus),
  comment: z.string().optional(),
});

export type TGetVacanciesQuery = z.infer<typeof GetVacanciesBodySchema>;
export type TSearchVacanciesBody = z.infer<typeof SearchVacanciesBodySchema>;
export type TUpdateStatusBody = z.infer<typeof UpdateStatusBodySchema>;

// Автоматическое выведение TypeScript-типа из схемы
export type TCreateUpdateVacancyInput = z.infer<
  typeof CreateUpdateVacancySchema
>;
