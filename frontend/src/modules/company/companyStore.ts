import { makeAutoObservable, runInAction } from "mobx";
import { companyApi, type TCompany } from "../../api/companyApi";
import { TypedStorage } from "../../utils/storage";
import { addToast } from "@heroui/react";
import { getFileSrc } from "../../api";
import { LoginFormType } from "../../types/rootTypes";

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

class CompanyStore {
  public company: TCompany | undefined = companyLocalStorage.get();

  public logInType: LoginFormType = LoginFormType.LogIn;

  public companyName = companyLocalStorage.get()?.name || "";

  form: TCompanyForm = defaultCompanyForm;

  constructor() {
    makeAutoObservable(this);
  }

  get companyLogoSrc() {
    if (this.company?.logoUrl) {
      return getFileSrc(this.company.logoUrl);
    }
  }

  get hasChanges() {
    return Boolean(this.companyName !== this.company?.name);
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

  public async updateCompanyLogo(newPhoto: File) {
    if (this.company === undefined) return;
    try {
      const company = await companyApi.updateLogo(this.company.id, newPhoto);

      runInAction(() => {
        addToast({
          title: "Логотип обновлен",
          color: "success",
        });

        this._setCompany(company);
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при обновлении логотипа",
        color: "danger",
      });
    }
  }

  public async updateCompany() {
    if (this.company === undefined) return;

    try {
      const company = await companyApi.updateCompany(this.company!.id, {
        ...this.company,
        name: this.companyName,
      });

      runInAction(() => {
        addToast({
          title: "Компания обновлена",
          color: "success",
        });

        this.company = company;
        this.companyName = company.name;

        companyLocalStorage.set(company);
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при обновлении компании",
        color: "danger",
      });
    }
  }

  public setCompanyName(name: string) {
    this.companyName = name;
  }

  public resetChanges() {
    this.companyName = this.company?.name || "";
  }

  public async register() {
    try {
      const company = await companyApi.register(this.form);

      this._setCompany(company);
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

      this._setCompany(company);
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

  private _setCompany(company: TCompany) {
    this.company = company;
    this.companyName = company.name;
    companyLocalStorage.set(company);
  }
}

export const companyStore = new CompanyStore();
