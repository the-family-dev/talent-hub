import apiClient from ".";
import type { EmploymentType, ExperienceLevel } from "../types/rootTypes";

export interface ICompanyVacancy {
  id: string;
  title: string;
  description?: string;
  salaryFrom?: number;
  salaryTo?: number;
  requirements?: string;
  location?: string;
  isRemote: boolean;
  isActive: boolean;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  tags: string[];
  createdAt: string;
  companyId?: string;
  updatedAt: string;
}

export interface ICompanyVacancyBase {
  id: string;
  title: string;
  description?: string;
  salaryFrom?: number;
  salaryTo?: number;
  location?: string;
  isRemote: boolean;
  isActive: boolean;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  createdAt: string;
  tags: string[];
}

export type TCreateEditVacancy = Omit<
  ICompanyVacancy,
  "id" | "createdAt" | "updatedAt"
>;

class CompanyVacanciesApi {
  public async addVacancy(vacancy: TCreateEditVacancy) {
    const response = await apiClient.post("/vacancies/create", vacancy);

    console.log(response);
  }

  public async getAllVacancies(filters?: {
    tags?: string[];
    search?: string;
    companyId?: string;
  }) {
    const response = await apiClient.post<ICompanyVacancyBase[]>(
      "/vacancies",
      filters
    );

    return response.data;
  }

  public async getVacancyById(id: string) {
    const response = await apiClient.get<ICompanyVacancy>(`/vacancies/${id}`);

    return response.data;
  }

  public async updateVacancy(id: string, vacancy: TCreateEditVacancy) {
    const respone = await apiClient.put<ICompanyVacancy>(
      `/vacancies/${id}`,
      vacancy
    );

    return respone.data;
  }

  public async deleteVacancy(id: string) {
    await apiClient.delete(`/vacancies/${id}`);
  }
}

export const companyVacanciesApi = new CompanyVacanciesApi();
