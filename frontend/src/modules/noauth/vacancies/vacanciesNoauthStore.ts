import { makeAutoObservable, runInAction } from "mobx";
import { addToast } from "@heroui/react";
import { debounce } from "../../../utils/debounce";
import type {
  IApplicantVacancy,
  TApplicantVacancyFilters,
} from "../../../types/vacancyTypes";
import { applicantVacanciesApi } from "../../../api/applicantVacanciesApi";
import {
  applicationApi,
  type TPublicApplicationInput,
} from "../../../api/applicationApi";
import { ExperienceLevel } from "../../../types/rootTypes";

const defaultFilters: TApplicantVacancyFilters = {
  search: "",
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
  filters: TApplicantVacancyFilters = {
    ...defaultFilters,
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

  public resetPublicRespond() {
    this.publicVacancyRespond = defaultPublicApplicatioonData;
  }

  public setPublicRespondField<K extends keyof TPublicApplicationInput>(
    field: K,
    value: TPublicApplicationInput[K]
  ) {
    this.publicVacancyRespond[field] = value;
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
