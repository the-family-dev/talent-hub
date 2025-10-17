import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";
import {
  TCreateUpdateVacancyInput,
  CreateUpdateVacancySchema,
  VacancyIdSchema,
  GetVacanciesBodySchema,
  UpdateStatusBodySchema,
  TUpdateStatusBody,
} from "../schemas/vacancy.schema";

export class VacancyController extends BaseController {
  getAll = async (req: Request, res: Response) => {
    try {
      const validationResult = GetVacanciesBodySchema.safeParse(req.body ?? {});

      if (!validationResult.success) {
        return this.error(res, validationResult.error);
      }

      const { search, companyId, tags, isActive, status } =
        validationResult.data;

      const vacancies = await prisma.vacancy.findMany({
        where: {
          AND: [
            status ? { status } : {},
            isActive ? { isActive } : {},
            companyId ? { companyId } : {},
            search
              ? {
                  OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                  ],
                }
              : {},
            tags
              ? {
                  tags: {
                    some: {
                      tag: {
                        name: {
                          in: tags,
                        },
                      },
                    },
                  },
                }
              : {},
          ],
        },
        orderBy: {
          title: "asc",
        },
        include: {
          tags: {
            select: {
              tag: {
                select: { name: true },
              },
            },
          },
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
            },
          },
        },
      });

      const formattedVacancies = vacancies.map((v) => ({
        ...v,
        tags: v.tags.map((t) => t.tag.name),
      }));

      return this.success(res, formattedVacancies);
    } catch (error) {
      console.error("Ошибка при получении вакансий:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  add = async (req: Request, res: Response) => {
    try {
      const validationResult = CreateUpdateVacancySchema.safeParse(req.body);

      if (!validationResult.success) {
        // Возвращаем ошибки валидации клиенту
        return this.error(res, validationResult.error);
      }

      const validatedData: TCreateUpdateVacancyInput = validationResult.data;

      const newVacancy = await prisma.vacancy.create({
        data: {
          // Основные данные вакансии
          title: validatedData.title,
          description: validatedData.description,
          salaryFrom: validatedData.salaryFrom,
          salaryTo: validatedData.salaryTo,
          employmentType: validatedData.employmentType,
          experienceLevel: validatedData.experienceLevel,
          location: validatedData.location,
          isRemote: validatedData.isRemote,
          isActive: validatedData.isActive,

          // Связь с тегами через промежуточную таблицу
          tags: {
            create: validatedData.tags?.map((tagName) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName },
                },
              },
            })),
          },

          company: {
            connect: { id: validatedData.companyId }, // Используем connect для связи с существующей компанией
          },
        },
      });

      this.success(res, newVacancy);
    } catch (error) {
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      // Валидация параметра ID
      const paramsValidation = VacancyIdSchema.safeParse(req.params);

      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      const { id } = paramsValidation.data;

      const vacancy = await prisma.vacancy.findUnique({
        where: { id },
        include: {
          tags: {
            select: {
              tag: {
                select: { name: true },
              },
            },
          },
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
            },
          },
          applications: {
            select: {
              id: true,
              status: true,
              createdAt: true,
              updatedAt: true,
              note: true,
              resume: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  experienceLevel: true,
                  tags: true,
                  pdfUrl: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      phone: true,
                      telegram: true,
                      email: true,
                      avatarUrl: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!vacancy) {
        return this.error(res, "Вакансия не найдена", 404);
      }

      const formattedVacancy = {
        ...vacancy,
        tags: vacancy.tags.map((t) => t.tag.name),
      };

      this.success(res, formattedVacancy);
    } catch (error) {
      console.error("Ошибка при получении вакансии:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      // Валидация параметра ID
      const paramsValidation = VacancyIdSchema.safeParse(req.params);

      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      const { id } = paramsValidation.data;

      // Проверяем существование вакансии
      const existingVacancy = await prisma.vacancy.findUnique({
        where: { id },
      });

      if (!existingVacancy) {
        return this.error(res, "Вакансия не найдена", 404);
      }

      // Удаляем вакансию
      await prisma.vacancy.delete({
        where: { id },
      });

      this.success(res, { message: "Вакансия успешно удалена" });
    } catch (error) {
      console.error("Ошибка при удалении вакансии:", error);

      // Обработка ошибок связанных данных
      if (
        error instanceof Error &&
        error.message.includes("foreign key constraint")
      ) {
        return this.error(
          res,
          "Невозможно удалить вакансию, так как с ней связаны другие данные",
          409
        );
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      // Валидация параметра ID
      const paramsValidation = VacancyIdSchema.safeParse(req.params);
      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      // Валидация тела запроса
      const bodyValidation = CreateUpdateVacancySchema.safeParse(req.body);
      if (!bodyValidation.success) {
        return this.error(res, bodyValidation.error);
      }

      const { id } = paramsValidation.data;
      const validatedData: TCreateUpdateVacancyInput = bodyValidation.data;

      // Проверяем существование вакансии
      const existingVacancy = await prisma.vacancy.findUnique({
        where: { id },
      });

      if (!existingVacancy) {
        return this.error(res, "Вакансия не найдена", 404);
      }

      // Обновляем вакансию
      const updatedVacancy = await prisma.vacancy.update({
        where: { id },
        data: {
          // Основные данные вакансии
          title: validatedData.title,
          description: validatedData.description,
          salaryFrom: validatedData.salaryFrom,
          salaryTo: validatedData.salaryTo,
          employmentType: validatedData.employmentType,
          experienceLevel: validatedData.experienceLevel,
          location: validatedData.location,
          isRemote: validatedData.isRemote,
          isActive: validatedData.isActive,
          status: validatedData.status,
          // Связь с тегами через промежуточную таблицу
          tags: {
            deleteMany: {}, // Удаляем все теги, если они есть
            create: validatedData.tags?.map((tagName) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName },
                },
              },
            })),
          },
        },
        include: {
          tags: {
            select: {
              tag: {
                select: { name: true },
              },
            },
          },
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const formattedVacancy = {
        ...updatedVacancy,
        tags: updatedVacancy.tags.map((t) => t.tag.name),
      };

      this.success(res, formattedVacancy);
    } catch (error) {
      console.error("Ошибка при обновлении вакансии:", error);

      // Обработка ошибок Prisma
      if (error instanceof Error && error.message.includes("RecordNotFound")) {
        return this.error(res, "Вакансия не найдена", 404);
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      // Валидация параметра ID
      const paramsValidation = VacancyIdSchema.safeParse(req.params);
      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }
      const { id } = paramsValidation.data;

      // Валидация тела запроса
      const bodyValidation = UpdateStatusBodySchema.safeParse(req.body);

      if (!bodyValidation.success) {
        return this.error(res, bodyValidation.error);
      }

      const validatedData: TUpdateStatusBody = bodyValidation.data;

      // Проверяем существование вакансии
      const existingVacancy = await prisma.vacancy.findUnique({
        where: { id },
      });

      if (!existingVacancy) {
        return this.error(res, "Вакансия не найдена", 404);
      }

      // Обновляем статус вакансии
      const updatedVacancy = await prisma.vacancy.update({
        where: { id },
        data: {
          status: validatedData.status,
        },
      });

      this.success(res, updatedVacancy);
    } catch (error) {
      console.error("Ошибка при обновлении статуса вакансии:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };
}
