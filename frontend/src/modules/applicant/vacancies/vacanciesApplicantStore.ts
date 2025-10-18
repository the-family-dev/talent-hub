import { makeAutoObservable, runInAction } from "mobx";
import { addToast } from "@heroui/react";
import { debounce } from "../../../utils/debounce";
import { applicantVacanciesApi } from "../../../api/applicantVacanciesApi";
import { applicantStore } from "../applicantStore";
import type {
  IApplicantVacancy,
  TApplicantVacancyFilters,
  TApplicantVacancyRespond,
} from "../../../types/vacancyTypes";

const defaultFilters: TApplicantVacancyFilters = {
  search: "",
};

class VacanciesApplicantStore {
  vacancies: IApplicantVacancy[] = [];

  filters: TApplicantVacancyFilters = {
    ...defaultFilters,
  };

  selectedVacancy: IApplicantVacancy | undefined = undefined;

  vacancyRespond: TApplicantVacancyRespond = {
    vacancy: undefined,
    note: "",
  };

  private _debouncedFetchVacancies = debounce(
    () => this.fetchApplicantVacancies(),
    500
  );

  constructor() {
    makeAutoObservable(this);
  }

  public setVacancyRespond(vacancy: IApplicantVacancy | undefined) {
    if (!applicantStore.resume) {
      addToast({
        title: "Чтобы откликнуться сначала загрузите резюме",
        color: "warning",
      });

      return;
    }

    this.vacancyRespond.vacancy = vacancy;
  }

  public resetVacancyRespond() {
    this.vacancyRespond = {
      vacancy: undefined,
      note: "",
    };
  }

  public setNote(note: string) {
    this.vacancyRespond.note = note;
  }

  public async sendVacancyRespond() {
    if (!applicantStore.resume) {
      addToast({
        title: "Чтобы откликнуться сначала загрузите резюме",
        color: "warning",
      });

      return;
    }

    if (this.vacancyRespond.vacancy === undefined) return;

    try {
      await applicantVacanciesApi.postRespond({
        vacancyId: this.vacancyRespond.vacancy.id,
        note: this.vacancyRespond.note,
        resumeId: applicantStore.resume.id,
      });

      addToast({
        title: "Отклик отправлен",
        color: "success",
      });
    } catch {
      addToast({
        title: "Вы уже откликались на эту вакансию",
        color: "warning",
      });
    }
    this.resetVacancyRespond();
  }

  public async fetchApplicantVacancies() {
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

export const vacanciesApplicantStore = new VacanciesApplicantStore();
