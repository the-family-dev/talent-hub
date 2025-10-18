import apiClient from ".";
import type { ICompanyVacancy } from "./companyVacanciesApi";

export interface IAdminCompanyVacancy extends ICompanyVacancy {
  company: {
    id: string;
    name: string;
    logoUrl: string;
  };
}

class AdminApi {
  public async getAllVacancy() {
    const response = await apiClient.get("/vacancies");
    return response.data;
  }

  public async getVacancyById(id: string) {
    const response = await apiClient.get<IAdminCompanyVacancy>(
      `/vacancies/${id}`
    );

    return response.data;
  }

  public async updateVacancyStatus(id: string, status: string, comment?: string) {
    const response = await apiClient.patch<IAdminCompanyVacancy>(
      `/vacancies/${id}/status`,
      {
        status,
        comment
      }
    );

    return response.data;
  }
}

export const adminApi = new AdminApi();
