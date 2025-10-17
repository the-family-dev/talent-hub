import { z } from "zod";
import { EmploymentType, ExperienceLevel } from "@prisma/client";

// ID параметра (для URL параметров)
export const VacancyIdSchema = z.object({
  id: z.uuid("Некорректный формат ID"),
});

export const CreateUpdateVacancySchema = z.object({
  title: z.string().min(2, "Название обязательно").max(255),
  description: z.string().optional(),
  requirements: z.string().optional(),
  salary: z.number().optional(),
  employmentType: z.enum(EmploymentType),
  experienceLevel: z.enum(ExperienceLevel),
  location: z.string().optional(),
  isRemote: z.boolean().default(false),
  isActive: z.boolean().default(true),
  companyId: z.uuid().optional(),
  tags: z.array(z.string()).optional(),
});

// Схема валидации для query параметров
export const GetVacanciesBodySchema = z.object({
  search: z.string().optional(),
  companyId: z.uuid("Некорректный формат companyId").optional(),
});

export type TGetVacanciesQuery = z.infer<typeof GetVacanciesBodySchema>;

// Автоматическое выведение TypeScript-типа из схемы
export type TCreateUpdateVacancyInput = z.infer<
  typeof CreateUpdateVacancySchema
>;
