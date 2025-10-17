import apiClient from ".";
import type {
  IApplicantVacancy,
  TApplicantRespond,
  TApplicantVacancyFilters,
} from "../types/vacancyTypes";
import { clearEmptyFields } from "../utils/utils";

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

  public async postRespond(respondInfo: TApplicantRespond) {
    const response = await apiClient.post(
      "/application",
      clearEmptyFields(respondInfo)
    );

    return response.data;
  }
}

export const applicantVacanciesApi = new ApplicantVacanciesApi();
