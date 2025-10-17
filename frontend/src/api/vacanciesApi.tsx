import apiClient from ".";

export interface IVacancy {
  id: string;
  title: string;
  description?: string;
  salary?: number;
  requirements?: string;
  location?: string;
  isRemote: boolean;
  isActive: boolean;
  employmentType: VacancyEmploymentType;
  experienceLevel: VacancyExperienceLevel;
  tags: string[];
  createdAt: string;
  companyId?: string;
  updatedAt: string;
}

export interface IListVacancy {
  id: string;
  title: string;
  description?: string;
  salary?: number;
  location?: string;
  isRemote: boolean;
  isActive: boolean;
  employmentType: VacancyEmploymentType;
  experienceLevel: VacancyExperienceLevel;
  tags: string[];
  createdAt: string;
  company: {
    id: string;
    name: string;
  };
}

export type TCreateVacancy = Omit<IVacancy, "id" | "createdAt" | "updatedAt">;

export enum VacancyEmploymentType {
  FullTime = "FULL_TIME",
  PartTime = "PART_TIME",
  Contract = "CONTRACT",
  Internship = "INTERNSHIP",
}

export enum VacancyExperienceLevel {
  Intern = "INTERN",
  Junior = "JUNIOR",
  Middle = "MIDDLE",
  Senior = "SENIOR",
  Lead = "LEAD",
}

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
