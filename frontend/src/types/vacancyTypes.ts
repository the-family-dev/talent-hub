import type { EmploymentType, ExperienceLevel } from "./rootTypes";

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

export type TApplicantVacancyRespond = {
  vacancy: IApplicantVacancy | undefined;
  note: string;
};

export type TApplicantRespond = {
  resumeId?: string;
  vacancyId: string;
  note?: string;
};
