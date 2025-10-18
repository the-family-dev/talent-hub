import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";
import {
  CreateUpdateInternshipSchema,
  GetInternshipsBodySchema,
  InternshipIdSchema,
  TCreateUpdateInternshipInput,
} from "../schemas/internship.schema";

export class InternshipController extends BaseController {
  getAll = async (req: Request, res: Response) => {
    try {
      const validationResult = GetInternshipsBodySchema.safeParse(
        req.body ?? {}
      );
      if (!validationResult.success)
        return this.error(res, validationResult.error);

      const { search, universityId, tags, location, experienceLevel } =
        validationResult.data;

      const internships = await prisma.internship.findMany({
        where: {
          AND: [
            location ? { location } : {},
            experienceLevel ? { experienceLevel } : {},
            universityId ? { universityId } : {},
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
                        name: { in: tags },
                      },
                    },
                  },
                }
              : {},
          ],
        },
        orderBy: { title: "asc" },
        include: {
          tags: { select: { tag: { select: { name: true } } } },
          university: {
            select: { id: true, name: true, logoUrl: true, location: true },
          },
          files: true,
        },
      });

      const formattedInternships = internships.map((i) => ({
        ...i,
        tags: i.tags.map((t) => t.tag.name),
      }));

      this.success(res, formattedInternships);
    } catch (error) {
      console.error("Ошибка при получении стажировок:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  add = async (req: Request, res: Response) => {
    try {
      const validationResult = CreateUpdateInternshipSchema.safeParse(req.body);
      if (!validationResult.success)
        return this.error(res, validationResult.error);

      const validatedData: TCreateUpdateInternshipInput = validationResult.data;

      const newInternship = await prisma.internship.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          salaryFrom: validatedData.salaryFrom,
          salaryTo: validatedData.salaryTo,
          location: validatedData.location,
          experienceLevel: validatedData.experienceLevel,
          university: { connect: { id: validatedData.universityId } },
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
          files: {
            create: validatedData.files?.map((fileUrl) => ({ fileUrl })),
          },
        },
        include: {
          tags: { select: { tag: { select: { name: true } } } },
          files: true,
        },
      });

      const formattedInternship = {
        ...newInternship,
        tags: newInternship.tags.map((t) => t.tag.name),
      };

      this.success(res, formattedInternship);
    } catch (error) {
      console.error("Ошибка при создании стажировки:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const paramsValidation = InternshipIdSchema.safeParse(req.params);
      if (!paramsValidation.success)
        return this.error(res, paramsValidation.error);

      const { id } = paramsValidation.data;

      const internship = await prisma.internship.findUnique({
        where: { id },
        include: {
          tags: { select: { tag: { select: { name: true } } } },
          files: true,
          university: {
            select: { id: true, name: true, logoUrl: true, location: true },
          },
        },
      });

      if (!internship) return this.error(res, "Стажировка не найдена", 404);

      const formattedInternship = {
        ...internship,
        tags: internship.tags.map((t) => t.tag.name),
      };

      this.success(res, formattedInternship);
    } catch (error) {
      console.error("Ошибка при получении стажировки:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const paramsValidation = InternshipIdSchema.safeParse(req.params);
      if (!paramsValidation.success)
        return this.error(res, paramsValidation.error);

      const bodyValidation = CreateUpdateInternshipSchema.safeParse(req.body);
      if (!bodyValidation.success) return this.error(res, bodyValidation.error);

      const { id } = paramsValidation.data;
      const validatedData: TCreateUpdateInternshipInput = bodyValidation.data;

      const updatedInternship = await prisma.internship.update({
        where: { id },
        data: {
          title: validatedData.title,
          description: validatedData.description,
          salaryFrom: validatedData.salaryFrom,
          salaryTo: validatedData.salaryTo,
          location: validatedData.location,
          experienceLevel: validatedData.experienceLevel,
          tags: {
            deleteMany: {},
            create: validatedData.tags?.map((tagName) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName },
                },
              },
            })),
          },
          files: {
            deleteMany: {},
            create: validatedData.files?.map((fileUrl) => ({ fileUrl })),
          },
        },
        include: {
          tags: { select: { tag: { select: { name: true } } } },
          files: true,
        },
      });

      const formattedInternship = {
        ...updatedInternship,
        tags: updatedInternship.tags.map((t) => t.tag.name),
      };

      this.success(res, formattedInternship);
    } catch (error) {
      console.error("Ошибка при обновлении стажировки:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const paramsValidation = InternshipIdSchema.safeParse(req.params);
      if (!paramsValidation.success)
        return this.error(res, paramsValidation.error);

      const { id } = paramsValidation.data;

      await prisma.internship.delete({ where: { id } });

      this.success(res, { message: "Стажировка успешно удалена" });
    } catch (error) {
      console.error("Ошибка при удалении стажировки:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };
}
