import { makeAutoObservable, runInAction } from "mobx";
import { addToast } from "@heroui/react";
import { debounce } from "../../../utils/debounce";
import type {
  IApplicantVacancy,
  TApplicantVacancyFilters,
} from "../../../types/vacancyTypes";
import { applicantVacanciesApi } from "../../../api/applicantVacanciesApi";

const defaultFilters: TApplicantVacancyFilters = {
  search: "",
};

class VacanciesNoauthStore {
  vacancies: IApplicantVacancy[] = [];

  filters: TApplicantVacancyFilters = {
    ...defaultFilters,
  };

  selectedVacancy: IApplicantVacancy | undefined = undefined;

  private _debouncedFetchVacancies = debounce(
    () => this.fetchNoauthVacancies(),
    500
  );

  constructor() {
    makeAutoObservable(this);
  }

  public async fetchNoauthVacancies() {
    try {
      const vacancies = await applicantVacanciesApi.getAllVacanciesApplicant(
        this.filters
      );

      runInAction(() => {
        this.vacancies = vacancies;
      });
    } catch {
      addToast({
        title: "Ошибка получения списка вакансий",
        color: "danger",
      });
    }
  }

  public async fetchVacancyById(id?: string) {
    if (id === undefined) return;

    try {
      const vacancy = await applicantVacanciesApi.getVacancyById(id);

      runInAction(() => {
        this.selectedVacancy = vacancy;
      });
    } catch {
      addToast({
        title: "Ошибка получения информации о вакансии",
        color: "danger",
      });
    }
  }

  public setFilterValue<K extends keyof TApplicantVacancyFilters>(
    filter: K,
    value: TApplicantVacancyFilters[K]
  ) {
    this.filters[filter] = value;
    this._debouncedFetchVacancies();
  }

  public clearFilters() {
    this.filters = { ...defaultFilters };
    this._debouncedFetchVacancies();
  }
}

export const vacanciesNoauthStore = new VacanciesNoauthStore();
