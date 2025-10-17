import { makeAutoObservable, runInAction } from "mobx";
import { addToast } from "@heroui/react";
import { debounce } from "../../../utils/debounce";
import {
  applicantVacanciesApi,
  type IApplicantVacancy,
} from "../../../api/applicantVacanciesApi";
import { clearEmptyFields } from "../../../utils/utils";

type TVacancyFilters = {
  tags: string[];
  search: string;
  companyId: string;
};

const defaultFilters: TVacancyFilters = {
  tags: [],
  search: "",
  companyId: "",
};

class VacanciesApplicantStore {
  vacancies: IApplicantVacancy[] = [];

  filters: TVacancyFilters = {
    ...defaultFilters,
  };

  selectedVacancy: IApplicantVacancy | null = null;

  private _debouncedFetchVacancies = debounce(
    () => this.fetchApplicantVacancies(),
    500
  );

  constructor() {
    makeAutoObservable(this);
  }

  public async fetchApplicantVacancies() {
    try {
      const vacancies = await applicantVacanciesApi.getAllVacancies(
        clearEmptyFields({
          companyId: this.filters.companyId,
          search: this.filters.search,
          tags: this.filters.tags,
        })
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

  public setFilterSearch(search: string) {
    this.filters.search = search;
    this._debouncedFetchVacancies();
  }

  public setFilterCompanyId(companyId: string) {
    this.filters.companyId = companyId;
    this._debouncedFetchVacancies();
  }

  public setFilterTags(tags: string[]) {
    this.filters.tags = tags;
    this._debouncedFetchVacancies();
  }

  public clearFilters() {
    this.filters = { ...defaultFilters };
    this._debouncedFetchVacancies();
  }
}

export const vacanciesApplicantStore = new VacanciesApplicantStore();
