import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";

export class TagController extends BaseController {
  // Получение списка всех тегов
  public getAll = async (req: Request, res: Response) => {
    try {
      const tags = await prisma.tag.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc", // Сортировка по алфавиту
        },
      });

      this.success(res, tags);
    } catch (error) {
      console.error("Ошибка при получении тегов:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };
}
