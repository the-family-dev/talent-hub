import { makeAutoObservable } from "mobx";
import { ApplicationStatus } from "../../../types/rootTypes";

export interface ApplicationData {
  date: number;
  count: number;
}

export interface StatusData {
  status: string;
  count: number;
}

export interface CompanyData {
  name: string;
  applications: number;
}

class StatisticsStore {
  totalResumes = 120;
  totalApplications = 85;
  hiredCount = 30;

  applicationsOverTime: ApplicationData[] = Array.from(
    { length: 365 },
    (_, i) => ({
      // от текущей даты - i дней (в обратном порядке)
      date: Date.now() - (364 - i) * 24 * 60 * 60 * 1000,
      // случайное количество заявок от 5 до 25
      count: Math.floor(Math.random() * 20 + 5),
    })
  );

  statusMap = {
    [ApplicationStatus.Pending]: {
      text: "Новый",
      className: "text-default",
    },
    [ApplicationStatus.Interview]: {
      text: "Собеседование",
      className: "text-primary",
    },
    [ApplicationStatus.Rejected]: {
      text: "Отклонен",
      className: "text-danger",
    },
    [ApplicationStatus.Accepted]: {
      text: "Принят",
      className: "text-success",
    },
  };

  applicationStatuses: StatusData[] = [
    { status: this.statusMap[ApplicationStatus.Pending].text, count: 80 },
    { status: this.statusMap[ApplicationStatus.Interview].text, count: 30 },
    { status: this.statusMap[ApplicationStatus.Accepted].text, count: 10 },
    { status: this.statusMap[ApplicationStatus.Rejected].text, count: 60 },
  ];

  topCompanies: CompanyData[] = [
    { name: "Google", applications: 15 },
    { name: "Yandex", applications: 12 },
    { name: "Sber", applications: 10 },
    { name: "Tinkoff", applications: 8 },
    { name: "VK", applications: 7 },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

export const statisticsStore = new StatisticsStore();
