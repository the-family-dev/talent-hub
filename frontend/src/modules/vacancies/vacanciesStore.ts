import { makeAutoObservable, runInAction } from "mobx";
import {
  VacancyEmploymentType,
  VacancyExperienceLevel,
  vacanciesApi,
  type TCreateVacancy,
  type IListVacancy,
} from "../../api/vacanciesApi";
import { addToast } from "@heroui/react";
import { vacancyDescriptionMdTemplate } from "./vacanciesContsants";
import { companyStore } from "../company/companyStore";
import { debounce } from "../../utils/debounce";

const defaultVacancyFormData: TCreateVacancy = {
  title: "",
  description: vacancyDescriptionMdTemplate,
  salary: 100_000,
  isRemote: false,
  isActive: true,
  employmentType: VacancyEmploymentType.FullTime,
  experienceLevel: VacancyExperienceLevel.Junior,
  tags: [],
  location: "Москва",
  companyId: undefined,
};

type TVacancyFilters = {
  search: string;
};

const defaultFilters: TVacancyFilters = {
  search: "",
};

class VacanciesStore {
  vacancies: IListVacancy[] = [];

  filters: TVacancyFilters = {
    ...defaultFilters,
  };

  createVacancyForm: TCreateVacancy = defaultVacancyFormData;
  isCreateModalOpen = false;

  private _debouncedFetchVacancies = debounce(() => this.fetchVacancies(), 500);

  constructor() {
    makeAutoObservable(this);
  }

  public async fetchVacancies() {
    try {
      const vacancies = await vacanciesApi.getAllVacancies({
        companyId: companyStore.company?.id,
        search: this.filters.search,
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

  public async addVacancy() {
    try {
      await vacanciesApi.addVacancy({
        ...this.createVacancyForm,
        companyId: companyStore.company?.id,
      });

      runInAction(() => {
        this.fetchVacancies();
        addToast({
          title: "Вакансия добавлена",
          color: "success",
        });
        this.setCreateModalOpen(false);
      });
    } catch {
      addToast({
        title: "Ошибка добавления вакансии",
        color: "danger",
      });
    }
  }

  public setCreateModalOpen(open: boolean) {
    if (!open) {
      this.createVacancyForm = {
        ...defaultVacancyFormData,
      };
    }

    this.isCreateModalOpen = open;
  }

  public setFilterSearch(search: string) {
    this.filters.search = search;
    this._debouncedFetchVacancies();
  }

  public setVacancyTitle(title: string) {
    this.createVacancyForm.title = title;
  }

  public setVacancyDescription(description?: string) {
    this.createVacancyForm.description = description;
  }

  public setVacancySlary(salary?: number) {
    this.createVacancyForm.salary = salary;
  }

  public setVacancyIsRemote(isRemote: boolean) {
    this.createVacancyForm.isRemote = isRemote;
  }

  public setVacancyIsActive(isActive: boolean) {
    this.createVacancyForm.isActive = isActive;
  }

  public setVacancyEmploymentType(employmentType: VacancyEmploymentType) {
    this.createVacancyForm.employmentType = employmentType;
  }

  public setVacancyExperienceLevel(experienceLevel: VacancyExperienceLevel) {
    this.createVacancyForm.experienceLevel = experienceLevel;
  }

  public setVacancyTags(tags: string[]) {
    this.createVacancyForm.tags = tags;
  }

  public setVacancyLocation(location: string) {
    this.createVacancyForm.location = location;
  }
}

export const vacanciesStore = new VacanciesStore();
