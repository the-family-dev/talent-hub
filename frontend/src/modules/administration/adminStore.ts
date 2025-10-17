import { makeObservable, runInAction } from "mobx";
import {
  companyVacanciesApi,
  type ICompanyVacancyBase,
} from "../../api/companyVacanciesApi";
import { addToast } from "@heroui/react";
import cloneDeep from "clone-deep";
import { debounce } from "../../utils/debounce";
import type { ApplicationStatus } from "../../types/rootTypes";

type TAdminVacancyFilters = {
  search?: string;
  status?: ApplicationStatus;
};

const defaultAdminVacancyFilters: TAdminVacancyFilters = {
  search: "",
  status: undefined,
};

class AdminStore {
  vacancies: ICompanyVacancyBase[] = [];

  filters: TAdminVacancyFilters = cloneDeep(defaultAdminVacancyFilters);

  constructor() {
    makeObservable(this);
  }

  private _debouncedGetVacancyList = debounce(() => this.getVacancyList(), 500);

  public setFilterFiled<K extends keyof TAdminVacancyFilters>(
    field: K,
    value: TAdminVacancyFilters[K]
  ) {
    this.filters[field] = value;
    this._debouncedGetVacancyList();
  }

  public async getVacancyList() {
    try {
      const vacancies = await companyVacanciesApi.getAllVacancies();

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
