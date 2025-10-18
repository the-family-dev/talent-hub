import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import prisma from "../lib/prisma";
import { ApplicationStatus } from "@prisma/client";

export class AnalyticsController extends BaseController {
  // Получить все данные для дэшборда
  public getDashboardData = async (req: Request, res: Response) => {
    try {
      // 1. Общее количество резюме
      const totalResumes = await prisma.resume.count();

      // 2. Общее количество откликов
      const totalApplications = await prisma.application.count();

      // 3. Количество принятых заявок
      const hiredCount = await prisma.application.count({
        where: { status: ApplicationStatus.ACCEPTED },
      });

      // 4. Заявки по времени (последние 365 дней)
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 364);

      const applications = await prisma.application.findMany({
        where: { createdAt: { gte: startDate } },
        select: { createdAt: true },
      });

      const applicationsOverTime: { date: number; count: number }[] =
        Array.from({ length: 365 }, (_, i) => ({
          date: startDate.getTime() + i * 24 * 60 * 60 * 1000,
          count: 0,
        }));

      applications.forEach((app) => {
        const dayIndex = Math.floor(
          (app.createdAt.getTime() - startDate.getTime()) /
            (24 * 60 * 60 * 1000)
        );
        if (dayIndex >= 0 && dayIndex < 365)
          applicationsOverTime[dayIndex].count++;
      });

      // 5. Статистика по статусам
      const statuses = await prisma.application.groupBy({
        by: ["status"],
        _count: { status: true },
      });

      const statusMap = {
        PENDING: "Новый",
        INTERVIEW: "Собеседование",
        ACCEPTED: "Принят",
        REJECTED: "Отклонен",
      };

      const applicationStatuses = statuses.map((s) => ({
        status: statusMap[s.status] || s.status,
        count: s._count.status,
      }));

      // 6. Топ компаний по количеству заявок
      const companies = await prisma.company.findMany({
        select: {
          name: true,
          vacancies: {
            select: {
              applications: { select: { id: true } },
            },
          },
        },
      });

      const topCompanies = companies
        .map((company) => {
          const applicationsCount = company.vacancies.reduce(
            (sum, vac) => sum + vac.applications.length,
            0
          );
          return { name: company.name, applications: applicationsCount };
        })
        .sort((a, b) => b.applications - a.applications)
        .slice(0, 5);

      // 7. Статистика по тегам для виджета WordFrequencyDashboard
      const tags = await prisma.tag.findMany({
        select: {
          name: true,
          _count: {
            select: {
              vacancies: true,
              resumes: true,
              InternshipTag: true,
            },
          },
        },
      });

      const tagFrequencies: Record<string, number> = {};
      tags.forEach((tag) => {
        const count =
          tag._count.vacancies + tag._count.resumes + tag._count.InternshipTag;
        tagFrequencies[tag.name] = count;
      });

      const totalVacancies = await prisma.vacancy.count();

      // Возвращаем готовый объект для дэшборда
      return this.success(res, {
        totalResumes,
        totalApplications,
        hiredCount,
        applicationsOverTime,
        applicationStatuses,
        topCompanies,
        tagFrequencies,
        totalVacancies,
      });
    } catch (error) {
      console.error("Ошибка при получении данных для дэшборда:", error);
      this.error(res, "Внутренняя ошибка сервера");
    }
  };
}
