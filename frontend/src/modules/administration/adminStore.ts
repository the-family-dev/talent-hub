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
import { adminApi, type IAdminCompanyVacancy } from "../../api/adminApi";

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
  public comment: string = "";
  public isCompentOpned: boolean = false;
  public targetStatus: VacancyStatus | undefined = undefined;

  selectedVacancy?: IAdminCompanyVacancy = undefined;

  private _debouncedGetVacancyList = debounce(() => this.getVacancyList(), 500);

  constructor() {
    makeAutoObservable(this);
  }

  get hasFilterChanges() {
    return !equal(this.filters, defaultAdminVacancyFilters);
  }

  public closeComment() {
    this.comment = "";
    this.isCompentOpned = false;
    this.targetStatus = undefined;
  }

  public setComment(comment: string) {
    this.comment = comment;
  }

  public setTargetStatus(status: VacancyStatus) {
    this.targetStatus = status;
    this.isCompentOpned = true
  }

  public async confirmStatusChange(){
    if(this.targetStatus === undefined) return;

    if (this.selectedVacancy === undefined) return;


    try {
      await adminApi.updateVacancyStatus(this.selectedVacancy.id, this.targetStatus, this.comment);

      runInAction(() => {
        if (this.selectedVacancy === undefined) return;
        if(this.targetStatus === undefined) return;

        this.selectedVacancy.status = this.targetStatus;

        this.closeComment()

      });

      addToast({
        title: "Статус вакансии изменен",
        color: "success",
      });
    } catch {
      addToast({
        title: "Ошибка изменения статуса вакансии",
        color: "danger",
      });
    }


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

  public async fetchVacancyById(id?: string) {
    if (id === undefined) return;

    try {
      const vacancy = await adminApi.getVacancyById(id);
      runInAction(() => {
        this.selectedVacancy = vacancy;
      });
    } catch {
      addToast({
        title: "Ошибка получения вакансии",
        color: "danger",
      });
    }
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

  
}

export const adminStore = new AdminStore();
