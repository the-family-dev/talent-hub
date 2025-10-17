import z from "zod";

// ID параметра (для URL параметров)
export const UserIdSchema = z.object({
  id: z.uuid("Некорректный формат ID"),
});

export const GetByLoginSchema = z.object({
  login: z.string(),
});

export const CreateUpdateUserSchema = z.object({
  name: z.string().min(1, "Имя пользователя обязательно").max(255),
  login: z.string().min(3, "Логин должен содержать минимум 3 символа").max(100),
  phone: z.string().optional(),
  email: z.email("Некорректный формат email").optional(),
  telegram: z.string().optional(),
});

// Автоматическое выведение TypeScript-типа из схемы
export type TCreateUpdateUserInput = z.infer<typeof CreateUpdateUserSchema>;
