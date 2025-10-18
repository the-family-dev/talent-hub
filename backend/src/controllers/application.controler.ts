import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";
import {
  CreateApplicationSchema,
  UpdateApplicationSchema,
  ApplicationIdSchema,
  GetApplicationsBodySchema,
  TApplicationCreateInput,
  TUpdateApplicationInput,
  PublicApplicationCreateSchema,
  TPublicApplicationCreateInput,
} from "../schemas/application.schema";

export class ApplicationController extends BaseController {
  // Получить все отклики
  getAll = async (req: Request, res: Response) => {
    try {
      const validation = GetApplicationsBodySchema.safeParse(req.body);
      if (!validation.success) {
        return this.error(res, validation.error);
      }

      const { resumeId, vacancyId, status } = validation.data;

      const applications = await prisma.application.findMany({
        where: {
          AND: [
            resumeId ? { resumeId } : {},
            vacancyId ? { vacancyId } : {},
            status ? { status } : {},
          ],
        },
        include: {
          resume: {
            select: {
              id: true,
              title: true,
              user: { select: { id: true, name: true, avatarUrl: true } },
            },
          },
          vacancy: {
            select: {
              id: true,
              title: true,
              company: { select: { id: true, name: true, logoUrl: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return this.success(res, applications);
    } catch (error) {
      console.error("Ошибка при получении откликов:", error);
      return this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Создать отклик
  add = async (req: Request, res: Response) => {
    try {
      const validation = CreateApplicationSchema.safeParse(req.body);
      if (!validation.success) {
        return this.error(res, validation.error);
      }

      const data: TApplicationCreateInput = validation.data;

      // Проверяем, не откликался ли уже этот резюме на вакансию
      const existing = await prisma.application.findUnique({
        where: {
          resumeId_vacancyId: {
            resumeId: data.resumeId,
            vacancyId: data.vacancyId,
          },
        },
      });

      if (existing) {
        return this.error(
          res,
          "Этот резюме уже откликался на данную вакансию",
          409
        );
      }

      const newApplication = await prisma.application.create({
        data: {
          resumeId: data.resumeId,
          vacancyId: data.vacancyId,
          note: data.note,
        },
        include: {
          resume: {
            select: { id: true, title: true },
          },
          vacancy: {
            select: { id: true, title: true },
          },
        },
      });

      return this.success(res, newApplication);
    } catch (error) {
      console.error("Ошибка при создании отклика:", error);
      return this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Получить отклик по ID
  getById = async (req: Request, res: Response) => {
    try {
      const validation = ApplicationIdSchema.safeParse(req.params);
      if (!validation.success) {
        return this.error(res, validation.error);
      }

      const { id } = validation.data;

      const application = await prisma.application.findUnique({
        where: { id },
        include: {
          resume: {
            select: { id: true, title: true, user: { select: { name: true } } },
          },
          vacancy: {
            select: {
              id: true,
              title: true,
              company: { select: { id: true, name: true } },
            },
          },
        },
      });

      if (!application) {
        return this.error(res, "Отклик не найден", 404);
      }

      return this.success(res, application);
    } catch (error) {
      console.error("Ошибка при получении отклика:", error);
      return this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Обновить статус отклика
  update = async (req: Request, res: Response) => {
    try {
      const params = ApplicationIdSchema.safeParse(req.params);
      if (!params.success) {
        return this.error(res, params.error);
      }

      const body = UpdateApplicationSchema.safeParse(req.body);
      if (!body.success) {
        return this.error(res, body.error);
      }

      const { id } = params.data;
      const data: TUpdateApplicationInput = body.data;

      const existing = await prisma.application.findUnique({ where: { id } });
      if (!existing) {
        return this.error(res, "Отклик не найден", 404);
      }

      const updated = await prisma.application.update({
        where: { id },
        data: {
          status: data.status,
          note: data.note,
        },
      });

      return this.success(res, updated);
    } catch (error) {
      console.error("Ошибка при обновлении отклика:", error);
      return this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Удалить отклик
  delete = async (req: Request, res: Response) => {
    try {
      const validation = ApplicationIdSchema.safeParse(req.params);
      if (!validation.success) {
        return this.error(res, validation.error);
      }

      const { id } = validation.data;

      const existing = await prisma.application.findUnique({ where: { id } });
      if (!existing) {
        return this.error(res, "Отклик не найден", 404);
      }

      await prisma.application.delete({ where: { id } });

      return this.success(res, { message: "Отклик успешно удалён" });
    } catch (error) {
      console.error("Ошибка при удалении отклика:", error);
      return this.error(res, "Внутренняя ошибка сервера");
    }
  };

  createPublicApplication = async (req: Request, res: Response) => {
    try {
      const body = PublicApplicationCreateSchema.safeParse(req.body);

      if (!body.success) {
        return this.error(res, body.error);
      }

      const data: TPublicApplicationCreateInput = body.data;

      const {
        phone,
        telegram,
        name,
        vacancyId,
        title,
        experienceLevel,
        description,
        note,
      } = data;

      // Путь к загруженному PDF (если есть)
      const filePath = req.file ? `/uploads/pdfs/${req.file.filename}` : null;

      const user = await prisma.user.create({
        data: {
          name,
          phone,
          login: phone,
          telegram,
        },
      });

      const resume = await prisma.resume.create({
        data: {
          title,
          experienceLevel,
          description,
          pdfUrl: filePath,

          user: { connect: { id: user.id } },
        },
      });

      // Проверяем, не откликался ли уже этот резюме на вакансию
      const existing = await prisma.application.findUnique({
        where: {
          resumeId_vacancyId: {
            resumeId: resume.id,
            vacancyId: data.vacancyId,
          },
        },
      });

      if (existing) {
        return this.error(
          res,
          "Этот резюме уже откликался на данную вакансию",
          409
        );
      }

      const newApplication = await prisma.application.create({
        data: {
          resumeId: resume.id,
          vacancyId: vacancyId,
          note,
        },
        include: {
          resume: {
            select: { id: true, title: true },
          },
          vacancy: {
            select: { id: true, title: true },
          },
        },
      });

      return this.success(res, newApplication);
    } catch (error) {
      console.error("Ошибка создания отклика:", error);
      return this.error(res, "Внутренняя ошибка сервера");
    }
  };
}
