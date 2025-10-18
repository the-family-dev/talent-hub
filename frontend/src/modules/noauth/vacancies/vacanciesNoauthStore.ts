import { makeAutoObservable, runInAction } from "mobx";
import { addToast } from "@heroui/react";
import { debounce } from "../../../utils/debounce";
import type {
  IApplicantVacancy,
  TVacancyFilters,
} from "../../../types/vacancyTypes";
import { applicantVacanciesApi } from "../../../api/applicantVacanciesApi";
import {
  applicationApi,
  type TPublicApplicationInput,
} from "../../../api/applicationApi";
import { ExperienceLevel } from "../../../types/rootTypes";
import equal from "fast-deep-equal";

type TPublicVacancyFilters = {
  search?: string;
  tags?: string[];
  companyId?: string;
  location?: string;
};

const defaultPublicVacanyFilters: TVacancyFilters = {
  search: "",
  tags: undefined,
  location: "",
};

const defaultPublicApplicatioonData: TPublicApplicationInput = {
  name: "",
  note: "",
  email: "",
  title: "",
  phone: "",
  experienceLevel: ExperienceLevel.Junior,
  vacancyId: "",
  pdfFile: undefined,
};

class VacanciesNoauthStore {
  vacancies: IApplicantVacancy[] = [];
  filters: TPublicVacancyFilters = {
    ...defaultPublicVacanyFilters,
  };
  selectedVacancy: IApplicantVacancy | undefined = undefined;
  publicVacancyRespond: TPublicApplicationInput = defaultPublicApplicatioonData;

  private _debouncedFetchVacancies = debounce(
    () => this.fetchNoauthVacancies(),
    500
  );

  constructor() {
    makeAutoObservable(this);
  }

  get hasFilterChanges() {
    return !equal(this.filters, defaultPublicVacanyFilters);
  }

  public async fetchNoauthVacancies() {
    try {
      const vacancies = await applicantVacanciesApi.getAllVacanciesApplicant({
        search: this.filters.search,
        tags: this.filters.tags,
        companyId: this.filters.companyId,
        location: this.filters.location,
      });

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

  public resetPublicRespond() {
    this.publicVacancyRespond = defaultPublicApplicatioonData;
  }

  public setPublicRespondField<K extends keyof TPublicApplicationInput>(
    field: K,
    value: TPublicApplicationInput[K]
  ) {
    this.publicVacancyRespond[field] = value;
  }

  public setFilterValue<K extends keyof TPublicVacancyFilters>(
    filter: K,
    value: TPublicVacancyFilters[K]
  ) {
    this.filters[filter] = value;
    this._debouncedFetchVacancies();
  }

  public resetFilters() {
    this.filters = { ...defaultPublicVacanyFilters };
    this._debouncedFetchVacancies();
  }

  public selectVacancyForRespond(vacancy: IApplicantVacancy) {
    this.publicVacancyRespond.title = vacancy.title;
    this.publicVacancyRespond.vacancyId = vacancy.id;
    this.publicVacancyRespond.experienceLevel = vacancy.experienceLevel;
  }

  public async sendVacancyPublicRespond() {
    try {
      await applicationApi.createPublicApplication(this.publicVacancyRespond);

      addToast({
        title: "Отклик успешно отправлен",
        color: "success",
      });
    } catch {
      addToast({
        title: "Не удалось отправить отклик",
        color: "warning",
      });
    }
    this.resetPublicRespond();
  }
}

export const vacanciesNoauthStore = new VacanciesNoauthStore();
