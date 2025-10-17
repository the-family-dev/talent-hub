import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";
import {
  CreateUpdateResumeSchema,
  GetResumesQuerySchema,
  ResumeIdSchema,
  TCreateUpdateResumeInput,
} from "../schemas/resume.schema";

export class ResumeController extends BaseController {
  // Получение всех резюме (поиск по title или location)
  getAll = async (req: Request, res: Response) => {
    try {
      const validation = GetResumesQuerySchema.safeParse(req.query);
      if (!validation.success) {
        return this.error(res, validation.error);
      }

      const { search } = validation.data;

      const resumes = await prisma.resume.findMany({
        where: {
          OR: [
            { title: { contains: search } },
            { location: { contains: search } },
          ],
        },
        include: {
          tags: { include: { tag: true } },
          user: { select: { id: true, name: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      this.success(res, resumes);
    } catch (error) {
      console.error("Ошибка при получении резюме:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Получение резюме: по id резюме или по id пользователя
  getById = async (req: Request, res: Response) => {
    try {
      const validation = ResumeIdSchema.safeParse(req.params);
      if (!validation.success) {
        return this.error(res, validation.error);
      }

      const { id } = validation.data;

      // Ищем по id резюме или по userId (так как одно резюме на пользователя)
      const resume = await prisma.resume.findFirst({
        where: {
          OR: [{ id }, { userId: id }],
        },
        include: {
          tags: { include: { tag: true } },
          user: { select: { id: true, name: true, avatarUrl: true } },
        },
      });

      if (!resume) {
        return this.error(res, "Резюме не найдено", 404);
      }

      const formatedResume = {
        ...resume,
        tags: resume.tags.map((tag) => tag.tag.name),
      };

      this.success(res, formatedResume);
    } catch (error) {
      console.error("Ошибка при получении резюме:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Создание резюме (только JSON, без PDF)
  add = async (req: Request, res: Response) => {
    try {
      const validation = CreateUpdateResumeSchema.safeParse(req.body);
      if (!validation.success) {
        return this.error(res, validation.error);
      }

      const data: TCreateUpdateResumeInput = validation.data;

      const newResume = await prisma.resume.create({
        data: {
          title: data.title,
          description: data.description,
          salaryFrom: data.salaryFrom,
          salaryTo: data.salaryTo,
          location: data.location,
          experienceLevel: data.experienceLevel,
          userId: data.userId,
          tags: {
            create: data.tags?.map((tagName) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName },
                },
              },
            })),
          },
        },
        include: { tags: { include: { tag: true } } },
      });

      const formatedResume = {
        ...newResume,
        tags: newResume.tags.map((tag) => tag.tag.name),
      };

      this.success(res, formatedResume);
    } catch (error) {
      console.error("Ошибка при создании резюме:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Обновление резюме (без изменения PDF)
  update = async (req: Request, res: Response) => {
    try {
      const paramsValidation = ResumeIdSchema.safeParse(req.params);
      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      const bodyValidation = CreateUpdateResumeSchema.safeParse(req.body);
      if (!bodyValidation.success) {
        return this.error(res, bodyValidation.error);
      }

      const { id } = paramsValidation.data;
      const data: TCreateUpdateResumeInput = bodyValidation.data;

      const existing = await prisma.resume.findUnique({ where: { id } });
      if (!existing) {
        return this.error(res, "Резюме не найдено", 404);
      }

      const updated = await prisma.resume.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          salaryFrom: data.salaryFrom,
          salaryTo: data.salaryTo,
          location: data.location,
          experienceLevel: data.experienceLevel,
          userId: data.userId,
          tags: {
            deleteMany: {}, // Удаляем все теги, если они есть
            create: data.tags?.map((tagName) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName },
                },
              },
            })),
          },
        },
        include: { tags: { include: { tag: true } } },
      });

      const formatedResume = {
        ...updated,
        tags: updated.tags.map((tag) => tag.tag.name),
      };

      this.success(res, formatedResume);
    } catch (error) {
      console.error("Ошибка при обновлении резюме:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Отдельная загрузка или обновление PDF файла
  uploadPdf = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return this.error(res, "Файл не загружен");
      }

      const validation = ResumeIdSchema.safeParse(req.params);
      if (!validation.success) {
        return this.error(res, validation.error);
      }

      const { id } = validation.data;

      const existing = await prisma.resume.findUnique({ where: { id } });
      if (!existing) {
        return this.error(res, "Резюме не найдено", 404);
      }

      const filePath = `/uploads/pdfs/${req.file.filename}`;

      const updated = await prisma.resume.update({
        where: { id },
        data: { pdfUrl: filePath },
        include: { tags: { include: { tag: true } } },
      });

      const formatedResume = {
        ...updated,
        tags: updated.tags.map((tag) => tag.tag.name),
      };

      this.success(res, formatedResume);
    } catch (error) {
      console.error("Ошибка загрузки PDF:", error);
      this.error(res, "Ошибка сервера");
    }
  };

  // Удаление резюме
  delete = async (req: Request, res: Response) => {
    try {
      const validation = ResumeIdSchema.safeParse(req.params);
      if (!validation.success) {
        return this.error(res, validation.error);
      }

      const { id } = validation.data;

      const existing = await prisma.resume.findUnique({ where: { id } });
      if (!existing) {
        return this.error(res, "Резюме не найдено", 404);
      }

      await prisma.resume.delete({ where: { id } });

      this.success(res, { message: "Резюме успешно удалено" });
    } catch (error) {
      console.error("Ошибка при удалении резюме:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };
}
