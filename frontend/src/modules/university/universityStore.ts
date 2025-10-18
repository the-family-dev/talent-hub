import { makeAutoObservable } from "mobx";
import { type TCompany } from "../../api/companyApi";
import { TypedStorage } from "../../utils/storage";
import { LoginFormType } from "../../types/rootTypes";
import { universityApi, type TUniversity } from "../../api/universityApi";
import { addToast } from "@heroui/react";
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

  public logOut() {
    this.university = undefined;
    universityLocalStorage.remove();
  }

  private _setUniversity(company: TUniversity) {
    this.university = company;
    universityLocalStorage.set(company);
  }
}

export const universityStore = new UniversityStore();
