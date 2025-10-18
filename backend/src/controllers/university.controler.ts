import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";
import {
  TCreateUpdateUniversityInput,
  CreateUpdateUniversitySchema,
  UniversityIdSchema,
  GetUniversityQuerySchema,
  GetByLoginSchema,
} from "../schemas/university.schema";

export class UniversityController extends BaseController {
  getAll = async (req: Request, res: Response) => {
    try {
      const validationResult = GetUniversityQuerySchema.safeParse(req.query);
      if (!validationResult.success)
        return this.error(res, validationResult.error);

      const { search } = validationResult.data;

      const universities = await prisma.university.findMany({
        where: { name: { contains: search } },
        orderBy: { name: "asc" },
      });

      this.success(res, universities);
    } catch (error) {
      console.error("Ошибка при получении университетов:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  add = async (req: Request, res: Response) => {
    try {
      const validationResult = CreateUpdateUniversitySchema.safeParse(req.body);
      if (!validationResult.success)
        return this.error(res, validationResult.error);

      const validatedData: TCreateUpdateUniversityInput = validationResult.data;

      const newUniversity = await prisma.university.create({
        data: validatedData,
      });

      this.success(res, newUniversity);
    } catch (error) {
      console.error("Ошибка при создании университета:", error);

      if (
        error instanceof Error &&
        error.message.includes("Unique constraint failed")
      ) {
        return this.error(
          res,
          "Университет с таким логином уже существует",
          409
        );
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const paramsValidation = UniversityIdSchema.safeParse(req.params);
      if (!paramsValidation.success)
        return this.error(res, paramsValidation.error);

      const { id } = paramsValidation.data;

      const university = await prisma.university.findUnique({ where: { id } });
      if (!university) return this.error(res, "Университет не найден", 404);

      this.success(res, university);
    } catch (error) {
      console.error("Ошибка при получении университета:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  getByLogin = async (req: Request, res: Response) => {
    try {
      const validationResult = GetByLoginSchema.safeParse(req.body);
      if (!validationResult.success)
        return this.error(res, validationResult.error);

      const { login } = validationResult.data;

      const university = await prisma.university.findUnique({
        where: { login },
      });
      if (!university) return this.error(res, "Университет не найден", 404);

      this.success(res, university);
    } catch (error) {
      console.error("Ошибка при получении университета по логину:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const paramsValidation = UniversityIdSchema.safeParse(req.params);
      if (!paramsValidation.success)
        return this.error(res, paramsValidation.error);

      const bodyValidation = CreateUpdateUniversitySchema.safeParse(req.body);
      if (!bodyValidation.success) return this.error(res, bodyValidation.error);

      const { id } = paramsValidation.data;
      const validatedData: TCreateUpdateUniversityInput = bodyValidation.data;

      const existingUniversity = await prisma.university.findUnique({
        where: { id },
      });
      if (!existingUniversity)
        return this.error(res, "Университет не найден", 404);

      const updatedUniversity = await prisma.university.update({
        where: { id },
        data: validatedData,
      });

      this.success(res, updatedUniversity);
    } catch (error) {
      console.error("Ошибка при обновлении университета:", error);

      if (
        error instanceof Error &&
        error.message.includes("Unique constraint failed")
      ) {
        return this.error(
          res,
          "Университет с таким логином уже существует",
          409
        );
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const paramsValidation = UniversityIdSchema.safeParse(req.params);
      if (!paramsValidation.success)
        return this.error(res, paramsValidation.error);

      const { id } = paramsValidation.data;

      const existingUniversity = await prisma.university.findUnique({
        where: { id },
      });
      if (!existingUniversity)
        return this.error(res, "Университет не найден", 404);

      await prisma.university.delete({ where: { id } });

      this.success(res, { message: "Университет успешно удален" });
    } catch (error) {
      console.error("Ошибка при удалении университета:", error);

      if (
        error instanceof Error &&
        error.message.includes("foreign key constraint")
      ) {
        return this.error(
          res,
          "Невозможно удалить университет, так как с ним связаны факультеты",
          409
        );
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  updateLogo = async (req: Request, res: Response) => {
    try {
      if (!req.file) return this.error(res, "Файл не загружен");

      const paramsValidation = UniversityIdSchema.safeParse(req.params);
      if (!paramsValidation.success)
        return this.error(res, paramsValidation.error);

      const { id: universityId } = paramsValidation.data;

      const filePath = `/uploads/images/${req.file.filename}`;

      if (req.file.mimetype.startsWith("image/")) {
        const updatedUniversity = await prisma.university.update({
          where: { id: universityId },
          data: { logoUrl: filePath },
        });

        return this.success(res, updatedUniversity);
      }
    } catch (err: any) {
      console.error("Ошибка загрузки файла:", err);
      return this.error(res, "Ошибка сервера");
    }
  };
}
