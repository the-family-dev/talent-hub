import { makeAutoObservable, runInAction } from "mobx";
import { type TCompany } from "../../api/companyApi";
import { TypedStorage } from "../../utils/storage";
import { LoginFormType } from "../../types/rootTypes";
import { universityApi, type TUniversity } from "../../api/universityApi";
import { addToast } from "@heroui/react";
import equal from "fast-deep-equal";
import cloneDeep from "clone-deep";
import {
  internshipApi,
  type IUniversityInternship,
  type IUniversityInternshipBase,
  type TCreateEditInternship,
} from "../../api/internshipApi";
import { routerStore } from "../router/routerStore";
const universityLocalStorageKey = "university";
const universityLocalStorage = new TypedStorage<TCompany | undefined>(
  universityLocalStorageKey,
  undefined
);

type TUniversityForm = {
  login: string;
  name: string;
};

type TInternshipFilters = {
  search: string;
};

const defaultCompanyForm: TUniversityForm = {
  login: "",
  name: "",
};

const defaultFilters: TInternshipFilters = {
  search: "",
};

class UniversityStore {
  form: TUniversityForm = defaultCompanyForm;
  public logInType: LoginFormType = LoginFormType.LogIn;

  filters: TInternshipFilters = {
    ...defaultFilters,
  };

  public university: TUniversity | undefined = universityLocalStorage.get();
  private _originalUniversity: TUniversity | undefined =
    universityLocalStorage.get();

  public internships: IUniversityInternshipBase[] = [];

  public selectedIternship: IUniversityInternship | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get hasChanges() {
    return !equal(this.university, this._originalUniversity);
  }

  get defaultInternshipData(): TCreateEditInternship {
    return {
      title: "",
      description: "",
      location: "",
      universityId: "",
      tags: [],
      files: [],
    };
  }

  public setInternshipFilterField<K extends keyof TInternshipFilters>(
    field: K,
    value: TInternshipFilters[K]
  ) {
    this.filters[field] = value;
  }

  public setLoginType(type: LoginFormType) {
    this.logInType = type;
    this.form = defaultCompanyForm;
  }

  public setFormField<T extends keyof TUniversityForm>(
    field: T,
    value: TUniversityForm[T]
  ) {
    this.form[field] = value;
  }

  public setUniversityField<T extends keyof TUniversity>(
    field: T,
    value: TUniversity[T]
  ) {
    if (this.university === undefined) return;

    this.university[field] = value;
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

  public async addInternship(internship: TCreateEditInternship) {
    if (this.university === undefined) return;

    try {
      await internshipApi.addInternship({
        ...internship,
        universityId: this.university.id,
      });

      addToast({
        title: "Стажировка добавлена",
        color: "success",
      });

      routerStore.navigate?.("/university/internship");
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при добавлении стажировки",
        color: "danger",
      });
    }
  }

  public async register() {
    try {
      const university = await universityApi.register(this.form);

      this._setUniversity(university);
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при регистрации",
        color: "danger",
      });
    }
  }

  public async logIn() {
    try {
      const university = await universityApi.login(this.form.login);

      this._setUniversity(university);
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при входе",
        color: "danger",
      });
    }
  }

  public async updateLogo(newPhoto: File) {
    if (this.university === undefined) return;
    try {
      const company = await universityApi.updateLogo(
        this.university.id,
        newPhoto
      );

      runInAction(() => {
        addToast({
          title: "Логотип обновлен",
          color: "success",
        });

        this._setUniversity(company);
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при обновлении логотипа",
        color: "danger",
      });
    }
  }

  public async updateUniversity() {
    if (this.university === undefined) return;

    try {
      const university = await universityApi.updateCompany(
        this.university.id,
        this.university
      );

      runInAction(() => {
        addToast({
          title: "Компания обновлена",
          color: "success",
        });

        this._setUniversity(university);

        universityLocalStorage.set(university);
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при обновлении компании",
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

  public async deleteInternship(id: string) {
    try {
      await internshipApi.deleteInternship(id);

      addToast({
        title: "Стажировка удалена",
        color: "success",
      });

      routerStore.navigate?.("/university/internship");
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при удалении стажировки",
        color: "danger",
      });
    }
  }

  public async updateInternship(internship: TCreateEditInternship) {
    if (this.selectedIternship === undefined) return;

    try {
      const updatedInternship = await internshipApi.updateInternship(
        this.selectedIternship.id,
        internship
      );

      runInAction(() => {
        this.selectedIternship = updatedInternship;

        addToast({
          title: "Стажировка изменена",
          color: "success",
        });

        routerStore.navigate?.(
          `/university/internship/${updatedInternship.id}`
        );
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при обновлении стажировки",
        color: "danger",
      });
    }
  }

  public logOut() {
    this.university = undefined;
    universityLocalStorage.remove();
  }

  public resetChanges() {
    this.university = cloneDeep(this._originalUniversity);
  }

  private _setUniversity(university: TUniversity) {
    this.university = university;
    this._originalUniversity = cloneDeep(university);
    universityLocalStorage.set(university);
  }
}

export const universityStore = new UniversityStore();
