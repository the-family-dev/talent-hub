import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";
import {
  TCreateUpdateVacancyInput,
  CreateUpdateVacancySchema,
  VacancyIdSchema,
  GetVacanciesBodySchema,
} from "../schemas/vacancy.schema";

export class VacanciesController extends BaseController {
  getAll = async (req: Request, res: Response) => {
    try {
      const validationResult = GetVacanciesBodySchema.safeParse(req.body ?? {});

      if (!validationResult.success) {
        return this.error(res, validationResult.error);
      }

      const { search, companyId } = validationResult.data;

      const vacancies = await prisma.vacancy.findMany({
        where: {
          AND: [
            companyId ? { companyId } : {},
            search
              ? {
                  title: {
                    contains: search,
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

      console.log(validatedData);

      const newVacancy = await prisma.vacancy.create({
        data: {
          // Основные данные вакансии
          title: validatedData.title,
          description: validatedData.description,
          requirements: validatedData.requirements,
          salary: validatedData.salary,
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
      });

      if (!vacancy) {
        return this.error(res, "Вакансия не найдена", 404);
      }

      this.success(res, vacancy);
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
          requirements: validatedData.requirements,
          salary: validatedData.salary,
          employmentType: validatedData.employmentType,
          experienceLevel: validatedData.experienceLevel,
          location: validatedData.location,
          isRemote: validatedData.isRemote,

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
        },
      });

      this.success(res, updatedVacancy);
    } catch (error) {
      console.error("Ошибка при обновлении вакансии:", error);

      // Обработка ошибок Prisma
      if (error instanceof Error && error.message.includes("RecordNotFound")) {
        return this.error(res, "Вакансия не найдена", 404);
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };
}
