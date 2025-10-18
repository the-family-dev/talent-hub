import { z } from "zod";

// ID параметра (для URL параметров)
export const UniversityIdSchema = z.object({
  id: z.uuid("Некорректный формат ID"),
});

export const GetByLoginSchema = z.object({
  login: z.string(),
});

export const CreateUpdateUniversitySchema = z.object({
  name: z.string().min(1, "Название университета обязательно").max(255),
  login: z.string().min(3, "Логин должен содержать минимум 3 символа").max(100),
});

// Схема валидации для query параметров
export const GetUniversityQuerySchema = z.object({
  search: z.string().optional(),
});

export type TGetUniversityQuery = z.infer<typeof GetUniversityQuerySchema>;

// Автоматическое выведение TypeScript-типа из схемы
export type TCreateUpdateUniversityInput = z.infer<
  typeof CreateUpdateUniversitySchema
>;
