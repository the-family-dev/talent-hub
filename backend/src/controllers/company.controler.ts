import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";
import {
  TCreateUpdateCompanyInput,
  CreateUpdateCompanySchema,
  CompanyIdSchema,
  GetCompaniesQuerySchema,
  GetByLoginSchema,
} from "../schemas/company.schema";

export class CompanyController extends BaseController {
  getAll = async (req: Request, res: Response) => {
    try {
      const validationResult = GetCompaniesQuerySchema.safeParse(req.query);

      if (!validationResult.success) {
        return this.error(res, validationResult.error);
      }

      const { search } = validationResult.data;

      const companies = await prisma.company.findMany({
        where: {
          name: {
            contains: search,
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      this.success(res, companies);
    } catch (error) {
      console.error("Ошибка при получении компаний:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  add = async (req: Request, res: Response) => {
    try {
      const validationResult = CreateUpdateCompanySchema.safeParse(req.body);

      if (!validationResult.success) {
        return this.error(res, validationResult.error);
      }

      const validatedData: TCreateUpdateCompanyInput = validationResult.data;

      const newCompany = await prisma.company.create({
        data: validatedData,
      });

      this.success(res, newCompany);
    } catch (error) {
      console.error("Ошибка при создании компании:", error);

      // Обработка ошибки уникальности логина
      if (
        error instanceof Error &&
        error.message.includes("Unique constraint failed")
      ) {
        return this.error(res, "Компания с таким логином уже существует", 409);
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const paramsValidation = CompanyIdSchema.safeParse(req.params);

      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      const { id } = paramsValidation.data;

      const company = await prisma.company.findUnique({
        where: { id },
      });

      if (!company) {
        return this.error(res, "Компания не найдена", 404);
      }

      this.success(res, company);
    } catch (error) {
      console.error("Ошибка при получении компании:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  getByLogin = async (req: Request, res: Response) => {
    try {
      const validationResult = GetByLoginSchema.safeParse(req.body);

      if (!validationResult.success) {
        return this.error(res, validationResult.error);
      }
      const { login } = validationResult.data;

      const company = await prisma.company.findUnique({
        where: { login },
      });

      if (!company) {
        return this.error(res, "Компания не найдена", 404);
      }

      this.success(res, company);
    } catch (error) {
      console.error("Ошибка при удалении компании:", error);

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const paramsValidation = CompanyIdSchema.safeParse(req.params);

      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      const { id } = paramsValidation.data;

      const existingCompany = await prisma.company.findUnique({
        where: { id },
      });

      if (!existingCompany) {
        return this.error(res, "Компания не найдена", 404);
      }

      await prisma.company.delete({
        where: { id },
      });

      this.success(res, { message: "Компания успешно удалена" });
    } catch (error) {
      console.error("Ошибка при удалении компании:", error);

      if (
        error instanceof Error &&
        error.message.includes("foreign key constraint")
      ) {
        return this.error(
          res,
          "Невозможно удалить компанию, так как с ней связаны вакансии",
          409
        );
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const paramsValidation = CompanyIdSchema.safeParse(req.params);
      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      const bodyValidation = CreateUpdateCompanySchema.safeParse(req.body);
      if (!bodyValidation.success) {
        return this.error(res, bodyValidation.error);
      }

      const { id } = paramsValidation.data;
      const validatedData: TCreateUpdateCompanyInput = bodyValidation.data;

      const existingCompany = await prisma.company.findUnique({
        where: { id },
      });

      if (!existingCompany) {
        return this.error(res, "Компания не найдена", 404);
      }

      const updatedCompany = await prisma.company.update({
        where: { id },
        data: validatedData,
      });

      this.success(res, updatedCompany);
    } catch (error) {
      console.error("Ошибка при обновлении компании:", error);

      if (
        error instanceof Error &&
        error.message.includes("Unique constraint failed")
      ) {
        return this.error(res, "Компания с таким логином уже существует", 409);
      }

      if (error instanceof Error && error.message.includes("RecordNotFound")) {
        return this.error(res, "Компания не найдена", 404);
      }

      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  public updateLogo = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return this.error(res, "Файл не загружен");
      }

      const paramsValidation = CompanyIdSchema.safeParse(req.params);
      if (!paramsValidation.success) {
        return this.error(res, paramsValidation.error);
      }

      const { id: companyId } = paramsValidation.data;

      //путь для базы данных
      const filePath = `/uploads/images/${req.file.filename}`;

      // Для логотипа сохраняем в поле logoUrl
      if (req.file.mimetype.startsWith("image/")) {
        const updatedCompany = await prisma.company.update({
          where: { id: companyId },
          data: { logoUrl: filePath },
        });

        return this.success(res, updatedCompany);
      }
    } catch (err: any) {
      console.error("Ошибка загрузки файла:", err);
      return this.error(res, "Ошибка сервера");
    }
  };
}
