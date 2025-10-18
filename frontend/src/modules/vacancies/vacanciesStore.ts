import { makeAutoObservable, runInAction } from "mobx";
import {
  companyVacanciesApi,
  type TCreateEditVacancy,
  type ICompanyVacancyBase,
  type ICompanyVacancy,
  type TResumeBankListItem,
} from "../../api/companyVacanciesApi";
import { addToast } from "@heroui/react";
import { vacancyDescriptionMdTemplate } from "./vacanciesContsants";
import { companyStore } from "../company/companyStore";
import { debounce } from "../../utils/debounce";
import { routerStore } from "../router/routerStore";
import {
  ApplicationStatus,
  EmploymentType,
  ExperienceLevel,
} from "../../types/rootTypes";
import cloneDeep from "clone-deep";
import { applicationApi } from "../../api/applicationApi";
import {
  internshipApi,
  type IUniversityInternship,
  type IUniversityInternshipBase,
} from "../../api/internshipApi";

const defaultVacancyFormData: TCreateEditVacancy = {
  title: "",
  description: vacancyDescriptionMdTemplate,
  salaryFrom: 100_000,
  salaryTo: 150_000,
  isRemote: false,
  employmentType: EmploymentType.FullTime,
  experienceLevel: ExperienceLevel.Junior,
  tags: [],
  location: "Москва",
  companyId: undefined,
};

type TVacancyFilters = {
  search: string;
};

type TInternShipFilter = {
  search: string;
  companyId?: string;
};

type TVacancyApplicationFilters = {
  status?: ApplicationStatus;
  search: string;
};

const defaultFilters: TVacancyFilters = {
  search: "",
};

const defaultInternShipFilters: TInternShipFilter = {
  search: "",
  companyId: undefined,
};

const defaultVacancyApplicationFilters: TVacancyApplicationFilters = {
  search: "",
  status: undefined,
};

class VacanciesStore {
  vacancies: ICompanyVacancyBase[] = [];
  // список вакансий для стажировки
  vacanciesInternship: ICompanyVacancyBase[] = [];
  internshipVacancyId?: string = undefined;
  filters: TVacancyFilters = {
    ...defaultFilters,
  };
  internShipFilters: TInternShipFilter = {
    ...defaultInternShipFilters,
  };

  applicationFilters: TVacancyApplicationFilters = cloneDeep(
    defaultVacancyApplicationFilters
  );

  public internships: IUniversityInternshipBase[] = [];

  public resumes: TResumeBankListItem[] = [];

  resumeFilters: TVacancyFilters = cloneDeep(defaultFilters);

  selectedVacancy?: ICompanyVacancy = undefined;
  public selectedIternship: IUniversityInternship | undefined = undefined;

  private _debouncedFetchVacancies = debounce(() => this.fetchVacancies(), 500);
  private _debouncedFetchInternships = debounce(
    () => this.fetchInternships(),
    500
  );

  constructor() {
    makeAutoObservable(this);
  }

  get defaultVacancyData() {
    return {
      ...cloneDeep(defaultVacancyFormData),
      companyId: companyStore.company?.id,
    };
  }

  get filteredAplications() {
    if (this.selectedVacancy === undefined) return [];

    const { search, status } = this.applicationFilters;

    return this.selectedVacancy.applications.filter((application) => {
      const matchName = application.resume.user.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus = status ? application.status === status : true;

      return matchName && matchStatus;
    });
  }

  public setVacancyApplicationFilter<
    K extends keyof TVacancyApplicationFilters
  >(field: K, value: TVacancyApplicationFilters[K]) {
    this.applicationFilters[field] = value;
  }

  public setInternshipFilter<K extends keyof TInternShipFilter>(
    field: K,
    value: TInternShipFilter[K]
  ) {
    this.internShipFilters[field] = value;
    this._debouncedFetchInternships();
  }

  public resetInternshipFilters() {
    this.internShipFilters = {
      ...defaultInternShipFilters,
    };
  }

  public setInternshipVacancyId(id: string | undefined) {
    this.internshipVacancyId = id;
  }

  public async fetchInternshipById(id?: string) {
    if (id === undefined) return;

    try {
      const internship = await internshipApi.getVacancyById(id);

      runInAction(() => {
        this.selectedIternship = internship;
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при получении стажировки",
        color: "danger",
      });
    }
  }

  public async linkInternshipToVacancy() {
    if (this.internshipVacancyId === undefined) return;
    if (this.selectedIternship === undefined) return;

    try {
      await companyVacanciesApi.linkInternship(
        this.internshipVacancyId,
        this.selectedIternship.id
      );

      addToast({
        title: "Стажировка привязана к вакансии",
        color: "success",
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при привязке стажировки к вакансии",
        color: "danger",
      });
    }
  }

  public async updateApplicationStatus(
    applicationId: string,
    status: ApplicationStatus,
    comment?: string
  ) {
    try {
      await applicationApi.updateStatus(applicationId, status, comment);

      addToast({
        title: "Статус отклика успешно обновлен",
        color: "success",
      });

      this.fetchVacancyById(this.selectedVacancy?.id);
    } catch {
      addToast({
        title: "Ошибка обновления статуса",
        color: "danger",
      });
    }
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

  public async fetchVacanciesForInternshipt() {
    try {
      const vacancies = await companyVacanciesApi.getAllVacancies({
        companyId: companyStore.company?.id,
      });

      runInAction(() => {
        this.vacanciesInternship = vacancies;
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

  public async fetchInternships() {
    try {
      const internships = await internshipApi.getInternships();
      runInAction(() => {
        this.internships = internships;
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при получении стажировок",
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
  public async getAllResumes(search: string) {
    try {
      const resumes = await companyVacanciesApi.getResumes(search);
      this.resumes = resumes;
    } catch {
      addToast({
        title: "Не удалось получить список стажировок",
        color: "danger",
      });
    }
  }

  public setResumeFilterSearch(search: string) {
    this.resumeFilters.search = search;
    this._debouncedFetchVacancies();
  }

  public setFilterSearch(search: string) {
    this.filters.search = search;
    this._debouncedFetchVacancies();
  }
}

export const vacanciesStore = new VacanciesStore();
