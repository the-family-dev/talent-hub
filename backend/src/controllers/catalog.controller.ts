import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";

export class CatalogController extends BaseController {
  // Получение списка всех тегов
  public getAllTags = async (req: Request, res: Response) => {
    try {
      const tags = await prisma.tag.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      this.success(res, tags);
    } catch (error) {
      console.error("Ошибка при получении тегов:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };

  // Получение списка всех тегов
  public getAllCompany = async (req: Request, res: Response) => {
    try {
      const tags = await prisma.company.findMany({
        select: {
          id: true,
          name: true,
          logoUrl: true,
        },
      });

      this.success(res, tags);
    } catch (error) {
      console.error("Ошибка при получении компаний:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };
}
