import { makeAutoObservable, runInAction } from "mobx";
import {
  companyVacanciesApi,
  type TCreateEditVacancy,
  type ICompanyVacancyBase,
  type ICompanyVacancy,
} from "../../api/companyVacanciesApi";
import { addToast } from "@heroui/react";
import { vacancyDescriptionMdTemplate } from "./vacanciesContsants";
import { companyStore } from "../company/companyStore";
import { debounce } from "../../utils/debounce";
import { routerStore } from "../router/routerStore";
import { EmploymentType, ExperienceLevel } from "../../types/rootTypes";

const defaultVacancyFormData: TCreateEditVacancy = {
  title: "",
  description: vacancyDescriptionMdTemplate,
  salaryFrom: 100_000,
  salaryTo: 150_000,
  isRemote: false,
  isActive: true,
  employmentType: EmploymentType.FullTime,
  experienceLevel: ExperienceLevel.Junior,
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
  vacancies: ICompanyVacancyBase[] = [];
  filters: TVacancyFilters = {
    ...defaultFilters,
  };
  selectedVacancy?: ICompanyVacancy = undefined;
  private _debouncedFetchVacancies = debounce(() => this.fetchVacancies(), 500);

  constructor() {
    makeAutoObservable(this);
  }

  get defaultVacancyData() {
    return {
      ...defaultVacancyFormData,
      companyId: companyStore.company?.id,
    };
  }

  public async fetchVacancies() {
    try {
      const vacancies = await companyVacanciesApi.getAllVacancies({
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

  public async addVacancy(vacancy: TCreateEditVacancy) {
    try {
      await companyVacanciesApi.addVacancy(vacancy);

      runInAction(() => {
        routerStore.navigate?.("/company/vacancy");

        this.fetchVacancies();

        addToast({
          title: "Вакансия добавлена",
          color: "success",
        });
      });
    } catch {
      addToast({
        title: "Ошибка добавления вакансии",
        color: "danger",
      });
    }
  }

  public async fetchVacancyById(id?: string) {
    if (id === undefined) return;

    try {
      const vacancy = await companyVacanciesApi.getVacancyById(id);

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

  public async updateVacancy(vacancy: TCreateEditVacancy) {
    if (this.selectedVacancy === undefined) return;

    try {
      const updatedVacancy = await companyVacanciesApi.updateVacancy(
        this.selectedVacancy.id,
        vacancy
      );

      runInAction(() => {
        this.selectedVacancy = updatedVacancy;

        addToast({
          title: "Вакансия изменена",
          color: "success",
        });

        routerStore.navigate?.(`/company/vacancy/${updatedVacancy.id}`);
      });
    } catch {
      addToast({
        title: "Ошибка изменения вакансии",
        color: "danger",
      });
    }
  }

  public async deleteVacancy(id: string) {
    try {
      await companyVacanciesApi.deleteVacancy(id);

      runInAction(() => {
        this.vacancies = this.vacancies.filter((vacancy) => vacancy.id !== id);

        routerStore.navigate?.("/company/vacancy");

        addToast({
          title: "Вакансия удалена",
          color: "success",
        });
      });
    } catch {
      addToast({
        title: "Ошибка удаления вакансии",
        color: "danger",
      });
    }
  }

  public setFilterSearch(search: string) {
    this.filters.search = search;
    this._debouncedFetchVacancies();
  }
}

export const vacanciesStore = new VacanciesStore();
