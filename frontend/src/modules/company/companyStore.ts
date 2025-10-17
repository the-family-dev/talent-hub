import { makeAutoObservable, runInAction } from "mobx";
import { companyApi, type TCompany } from "../../api/companyApi";
import { TypedStorage } from "../../utils/storage";
import { addToast } from "@heroui/react";

const companyLocalStorageKey = "company";
const companyLocalStorage = new TypedStorage<TCompany | undefined>(
  companyLocalStorageKey,
  undefined
);

type TCompanyForm = {
  login: string;
  name: string;
};

const defaultCompanyForm: TCompanyForm = {
  login: "",
  name: "",
};

export enum LoginFormType {
  LogIn = "LogIn",
  Register = "Register",
}

class CompanyStore {
  public company: TCompany | undefined = companyLocalStorage.get();

  public logInType: LoginFormType = LoginFormType.LogIn;

  form: TCompanyForm = defaultCompanyForm;

  constructor() {
    makeAutoObservable(this);
  }

  public setFormLogin(login: string) {
    this.form.login = login;
  }

  public setFormName(name: string) {
    this.form.name = name;
  }

  public setLoginType(type: LoginFormType) {
    this.logInType = type;
    this.form = defaultCompanyForm;
  }

  public async register() {
    try {
      const company = await companyApi.register(this.form);

      runInAction(() => {
        this.company = company;
        companyLocalStorage.set(company);
      });
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
      const company = await companyApi.login(this.form.login);

      runInAction(() => {
        this.company = company;
        companyLocalStorage.set(company);
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при входе",
        color: "danger",
      });
    }
  }

  public logOut() {
    this.company = undefined;
    companyLocalStorage.set(undefined);
  }
}

export const companyStore = new CompanyStore();
