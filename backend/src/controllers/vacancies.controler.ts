import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";

export class VacanciesController extends BaseController {
  getVacancies = async (req: Request, res: Response) => {
    const vacancies = await prisma.vacancy.findMany({
      orderBy: {
        title: "asc",
      },
    });

    this.success(res, vacancies);
  };

  addVacancy = async (req: Request, res: Response) => {
    const { title, description, salary } = req.body;

    const newVacancy = await prisma.vacancy.create({
      data: {
        title,
        description,
        salary,
      },
    });

    this.success(res, newVacancy);
  };
}
