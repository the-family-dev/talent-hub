import apiClient from ".";
import type {
  ApplicationStatus,
  EmploymentType,
  ExperienceLevel,
  VacancyStatus,
} from "../types/rootTypes";

export type TVAcancyApplicationResume = {
  id: string;
  title: string;
  description?: string;
  experienceLevel: ExperienceLevel;
  tags: string[];
  pdfUrl?: string;
  user: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    telegram?: string;
    avatarUrl?: string;
  };
};

export type TVacancyApplication = {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  note?: string;
  resume: TVAcancyApplicationResume;
};

export interface ICompanyVacancyBase {
  id: string;
  title: string;
  description?: string;
  salaryFrom?: number;
  salaryTo?: number;
  location?: string;
  isRemote: boolean;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  createdAt: string;
  status: VacancyStatus;
  tags: string[];
}

export interface ICompanyVacancy extends ICompanyVacancyBase {
  companyId?: string;
  updatedAt: string;
  applications: TVacancyApplication[];
}

export type TCreateEditVacancy = Omit<
  ICompanyVacancy,
  "id" | "createdAt" | "updatedAt" | "applications" | "status"
>;

class CompanyVacanciesApi {
  public async addVacancy(vacancy: TCreateEditVacancy) {
    const response = await apiClient.post("/vacancies/create", vacancy);

    console.log(response);
  }

  public async getAllVacancies(filters?: {
    tags?: string[];
    search?: string;
    status?: VacancyStatus;
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
