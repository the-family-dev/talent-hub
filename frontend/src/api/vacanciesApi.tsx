import apiClient from ".";
import type { EmploymentType, ExperienceLevel } from "../types/rootTypes";

export interface IVacancy {
  id: string;
  title: string;
  description?: string;
  salary?: number;
  requirements?: string;
  location?: string;
  comment?: string;
  isRemote: boolean;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  tags: string[];
  createdAt: string;
  companyId?: string;
  updatedAt: string;
}

export interface IListVacancy {
  id: string;
  title: string;
  description?: string;
  comment?: string;
  salary?: number;
  location?: string;
  isRemote: boolean;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  tags: string[];
  createdAt: string;
  company: {
    id: string;
    name: string;
  };
}

export type TCreateVacancy = Omit<IVacancy, "id" | "createdAt" | "updatedAt">;

class VacanciesApi {
  public async addVacancy(vacancy: TCreateVacancy) {
    const response = await apiClient.post("/vacancies/create", vacancy);

    console.log(response);
  }

  public async getAllVacancies(filters?: {
    tags?: string[];
    search?: string;
    companyId?: string;
  }) {
    const response = await apiClient.post<IListVacancy[]>(
      "/vacancies",
      filters
    );

    return response.data;
  }
}

export const vacanciesApi = new VacanciesApi();
