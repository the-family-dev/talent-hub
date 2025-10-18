import { makeAutoObservable, runInAction } from "mobx";
import { type TCompany } from "../../api/companyApi";
import { TypedStorage } from "../../utils/storage";
import { LoginFormType } from "../../types/rootTypes";
import { universityApi, type TUniversity } from "../../api/universityApi";
import { addToast } from "@heroui/react";
import equal from "fast-deep-equal";
import cloneDeep from "clone-deep";
const universityLocalStorageKey = "university";
const universityLocalStorage = new TypedStorage<TCompany | undefined>(
  universityLocalStorageKey,
  undefined
);

type TUniversityForm = {
  login: string;
  name: string;
};

const defaultCompanyForm: TUniversityForm = {
  login: "",
  name: "",
};

class UniversityStore {
  form: TUniversityForm = defaultCompanyForm;
  public logInType: LoginFormType = LoginFormType.LogIn;

  public university: TUniversity | undefined = universityLocalStorage.get();
  public _originalUniversity: TUniversity | undefined =
    universityLocalStorage.get();

  constructor() {
    makeAutoObservable(this);
  }

  get hasChanges() {
    return !equal(this.university, this._originalUniversity);
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
