import { makeAutoObservable, runInAction } from "mobx";
import {
  companyVacanciesApi,
  type ICompanyVacancyBase,
} from "../../api/companyVacanciesApi";
import { addToast } from "@heroui/react";
import cloneDeep from "clone-deep";
import { debounce } from "../../utils/debounce";
import type { VacancyStatus } from "../../types/rootTypes";
import equal from "fast-deep-equal";

type TAdminVacancyFilters = {
  search?: string;
  status?: VacancyStatus;
};

const defaultAdminVacancyFilters: TAdminVacancyFilters = {
  search: "",
  status: undefined,
};

class AdminStore {
  vacancies: ICompanyVacancyBase[] = [];

  filters: TAdminVacancyFilters = cloneDeep(defaultAdminVacancyFilters);

  private _debouncedGetVacancyList = debounce(() => this.getVacancyList(), 500);

  constructor() {
    makeAutoObservable(this);
  }

  get hasFilterChanges() {
    return !equal(this.filters, defaultAdminVacancyFilters);
  }

  public setFilterFiled<K extends keyof TAdminVacancyFilters>(
    field: K,
    value: TAdminVacancyFilters[K]
  ) {
    this.filters[field] = value;

    this._debouncedGetVacancyList();
  }

  public resetFilters() {
    this.filters = cloneDeep(defaultAdminVacancyFilters);
    this._debouncedGetVacancyList();
  }

  public async getVacancyList() {
    try {
      const vacancies = await companyVacanciesApi.getAllVacancies({
        search: this.filters.search,
        status: this.filters.status,
      });

      runInAction(() => {
        this.vacancies = vacancies;
      });
    } catch {
      addToast({
        title: "Ошибка получения вакансий",
        color: "danger",
      });
    }
  }

  public async deleteVacancy() {}

  public async updateVacancyStatus() {}
}

export const adminStore = new AdminStore();
