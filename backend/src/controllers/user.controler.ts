import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import {
  CreateUpdateUserSchema,
  GetByLoginSchema,
  TCreateUpdateUserInput,
  UserIdSchema,
} from "../schemas/user.schema";
import prisma from "../lib/prisma";

export class UserController extends BaseController {
  add = async (req: Request, res: Response) => {
    try {
      const validationResult = CreateUpdateUserSchema.safeParse(req.body);

      if (!validationResult.success) {
        return this.error(res, validationResult.error);
      }

      const validatedData: TCreateUpdateUserInput = validationResult.data;

      const newUser = await prisma.user.create({
        data: validatedData,
      });

      this.success(res, newUser);
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);

      // Обработка ошибки уникальности логина
      if (
        error instanceof Error &&
        error.message.includes("Unique constraint failed")
      ) {
        return this.error(res, "Пользователь с таким логином уже существует");
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Получение пользователя по логину
  getByLogin = async (req: Request, res: Response) => {
    try {
      const validationResult = GetByLoginSchema.safeParse(req.body);

      if (!validationResult.success) {
        return this.error(res, validationResult.error);
      }

      const { login } = validationResult.data;

      const user = await prisma.user.findUnique({
        where: { login },
      });

      if (!user) {
        return this.error(res, "Пользователь не найден");
      }

      this.success(res, user);
    } catch (error) {
      console.error("Ошибка при получении пользователя:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      // Валидация параметра id из URL
      const paramsValidation = UserIdSchema.safeParse(req.params);
      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      const { id: userId } = paramsValidation.data;

      // Валидация тела запроса
      const bodyValidation = CreateUpdateUserSchema.safeParse(req.body);
      if (!bodyValidation.success) {
        return this.error(res, bodyValidation.error);
      }

      const validatedData: TCreateUpdateUserInput = bodyValidation.data;

      // Обновление пользователя
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: validatedData,
      });

      this.success(res, updatedUser);
    } catch (error: any) {
      console.error("Ошибка при обновлении пользователя:", error);

      // Обработка ошибки уникальности логина
      if (
        error instanceof Error &&
        error.message.includes("Unique constraint failed")
      ) {
        return this.error(res, "Пользователь с таким логином уже существует");
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  public updateAvatar = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return this.error(res, "Файл не загружен");
      }

      console.log(req.file);

      const paramsValidation = UserIdSchema.safeParse(req.params);

      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      const { id: companyId } = paramsValidation.data;

      // Определяем путь для базы данных
      const filePath = req.file.mimetype.startsWith("image/")
        ? `/uploads/images/${req.file.filename}`
        : `/uploads/pdfs/${req.file.filename}`;

      // Для логотипа сохраняем в поле logoUrl
      if (req.file.mimetype.startsWith("image/")) {
        const updatedCompany = await prisma.user.update({
          where: { id: companyId },
          data: { avatarUrl: filePath },
        });

        return this.success(res, updatedCompany);
      }
    } catch (err: any) {
      console.error("Ошибка загрузки файла:", err);
      return this.error(res, "Ошибка сервера");
    }
  };
}
