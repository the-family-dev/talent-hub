import apiClient from ".";
import type { EmploymentType, ExperienceLevel } from "../types/rootTypes";

export interface IApplicantVacancy {
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
  company: {
    id: string;
    name: string;
    logoUrl?: string;
  };
  createdAt: string;
  companyId?: string;
  updatedAt: string;
}

export type TApplicantVacancyFilters = {
  tags?: string[];
  search?: string;
  companyId?: string;
};

class ApplicantVacanciesApi {
  public async getAllVacanciesApplicant(filters: TApplicantVacancyFilters) {
    const response = await apiClient.post<IApplicantVacancy[]>(
      "/vacancies",
      { ...filters, isActive: true } // Соискатель видит только активные вакансии
    );

    return response.data;
  }

  public async getVacancyById(id: string) {
    const response = await apiClient.get<IApplicantVacancy>(`/vacancies/${id}`);

    return response.data;
  }
}

export const applicantVacanciesApi = new ApplicantVacanciesApi();
