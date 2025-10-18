import apiClient from ".";

export interface IApplicationData {
  date: number;
  count: number;
}

export interface IStatusData {
  status: string;
  count: number;
}

export interface ICompanyData {
  name: string;
  applications: number;
}

export interface IStatisticsData {
  totalResumes: number;
  totalApplications: number;
  hiredCount: number;
  applicationsOverTime: IApplicationData[];
  applicationStatuses: IStatusData[];
  topCompanies: ICompanyData[];
}

class StatisticsApi {
  public async getStatisticsData(
    startDate?: string,
    endDate?: string
  ): Promise<IStatisticsData> {
    const response = await apiClient.post<IStatisticsData>(
      "/analytics/dashboard",
      {
        startDate,
        endDate,
      }
    );

    return response.data;
  }
}

export const statisticsApi = new StatisticsApi();
