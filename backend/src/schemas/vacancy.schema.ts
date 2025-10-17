import { z } from "zod";
import { EmploymentType, ExperienceLevel } from "@prisma/client";

// ID параметра (для URL параметров)
export const VacancyIdSchema = z.object({
  id: z.uuid("Некорректный формат ID"),
});

export const CreateUpdateVacancySchema = z.object({
  title: z.string().min(2, "Название обязательно").max(255),
  description: z.string().optional(),
  salaryFrom: z.number().optional(),
  salaryTo: z.number().optional(),
  employmentType: z.enum(EmploymentType),
  experienceLevel: z.enum(ExperienceLevel),
  location: z.string().optional(),
  isRemote: z.boolean().default(false),
  isActive: z.boolean().default(true),
  companyId: z.uuid().optional(),
  tags: z.array(z.string()).optional(),
});

export const GetVacanciesBodySchema = z.object({
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
  companyId: z.uuid("Некорректный формат companyId").optional(),
  isActive: z.boolean().optional(),
});

export const SearchVacanciesBodySchema = z.object({
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type TGetVacanciesQuery = z.infer<typeof GetVacanciesBodySchema>;
export type TSearchVacanciesBody = z.infer<typeof SearchVacanciesBodySchema>;

// Автоматическое выведение TypeScript-типа из схемы
export type TCreateUpdateVacancyInput = z.infer<
  typeof CreateUpdateVacancySchema
>;
