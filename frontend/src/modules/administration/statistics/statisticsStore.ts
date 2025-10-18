import { makeAutoObservable, runInAction } from "mobx";
import {
  statisticsApi,
  type IApplicationData,
  type ICompanyData,
  type IStatusData,
} from "../../../api/statisticsApi";
import { addToast } from "@heroui/react";

class StatisticsStore {
  totalResumes = 0;
  totalApplications = 0;
  hiredCount = 0;

  applicationsOverTime: IApplicationData[] = [];

  statusMap = {};

  applicationStatuses: IStatusData[] = [];

  topCompanies: ICompanyData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public async getDashboardData() {
    try {
      const {
        topCompanies,
        totalApplications,
        totalResumes,
        applicationStatuses,
        applicationsOverTime,
        hiredCount,
      } = await statisticsApi.getStatisticsData();

      runInAction(() => {
        this.topCompanies = topCompanies;
        this.totalApplications = totalApplications;
        this.totalResumes = totalResumes;
        this.applicationStatuses = applicationStatuses;
        this.applicationsOverTime = applicationsOverTime;
        this.hiredCount = hiredCount;
      });
    } catch {
      addToast({
        title: "Ошибка при загрузке данных",
        color: "danger",
      });
    }
  }
}

export const statisticsStore = new StatisticsStore();
