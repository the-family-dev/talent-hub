import { z } from "zod";

// ID параметра (для URL параметров)
export const CompanyIdSchema = z.object({
  id: z.uuid("Некорректный формат ID"),
});

export const GetByLoginSchema = z.object({
  login: z.string(),
});

export const CreateUpdateCompanySchema = z.object({
  name: z.string().min(1, "Название компании обязательно").max(255),
  login: z.string().min(3, "Логин должен содержать минимум 3 символа").max(100),
});

// Схема валидации для query параметров
export const GetCompaniesQuerySchema = z.object({
  search: z.string().optional(),
});

export type TGetCompaniesQuery = z.infer<typeof GetCompaniesQuerySchema>;

// Автоматическое выведение TypeScript-типа из схемы
export type TCreateUpdateCompanyInput = z.infer<
  typeof CreateUpdateCompanySchema
>;
