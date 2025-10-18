import { z } from "zod";

// ID параметра (для URL параметров)
export const InternshipIdSchema = z.object({
  id: z.string().uuid("Некорректный формат ID"),
});

// Схема для фильтрации стажировок (POST body для getAll)
export const GetInternshipsBodySchema = z.object({
  search: z.string().optional(),
  universityId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  location: z.string().optional(),
  experienceLevel: z
    .enum(["INTERN", "JUNIOR", "MIDDLE", "SENIOR", "LEAD"])
    .optional(),
});

// Схема для создания/обновления стажировки
export const CreateUpdateInternshipSchema = z.object({
  title: z.string().min(1, "Название стажировки обязательно").max(255),
  description: z.string().optional(),
  salaryFrom: z.number().int().optional(),
  salaryTo: z.number().int().optional(),
  location: z.string().optional(),
  experienceLevel: z.enum(["INTERN", "JUNIOR", "MIDDLE", "SENIOR", "LEAD"]),
  universityId: z.string().uuid("Некорректный формат ID университета"),
  tags: z.array(z.string()).optional(),
  files: z.array(z.string()).optional(), // URL файлов PDF
});

// Схема для обновления статуса стажировки (если нужно)
export const UpdateInternshipStatusSchema = z.object({
  status: z.enum(["ACTIVE", "CLOSED", "MODERATION"]),
});

// TypeScript типы
export type TCreateUpdateInternshipInput = z.infer<
  typeof CreateUpdateInternshipSchema
>;
export type TGetInternshipsBody = z.infer<typeof GetInternshipsBodySchema>;
export type TUpdateInternshipStatus = z.infer<
  typeof UpdateInternshipStatusSchema
>;
