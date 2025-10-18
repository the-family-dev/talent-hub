import { makeAutoObservable, runInAction, toJS } from "mobx";
import equal from "fast-deep-equal";
import cloneDeep from "clone-deep";
import { TypedStorage } from "../../utils/storage";
import { addToast } from "@heroui/react";
import { getFileSrc } from "../../api";
import { applicantApi, type TApplicant } from "../../api/applicantApi";
import { ExperienceLevel, LoginFormType } from "../../types/rootTypes";
import {
  applicantResumeApi,
  type TApplicantResume,
  type TCreateResume,
} from "../../api/applicantResumeApi";
import { routerStore } from "../router/routerStore";
import { resumeDescriptionTemplate } from "./resume/resumeConstants";
import type { TPublicApplicationInput } from "../../api/applicationApi";

const applicantLocalStorageKey = "applicant";
const applicantLocalStorage = new TypedStorage<TApplicant | undefined>(
  applicantLocalStorageKey,
  undefined
);

type TApplicantForm = {
  login: string;
  name: string;
};

const defaultApplicantForm: TApplicantForm = {
  login: "",
  name: "",
};

const defaultPublicApplicantInfo: TPublicApplicationInput = {
  name: "",
  phone: "",
  vacancyId: "",
  title: "",
  email: "",
  experienceLevel: ExperienceLevel.Junior,
};

class ApplicantStore {
  public applicant: TApplicant | undefined = applicantLocalStorage.get();
  public _originalApplicant: TApplicant | undefined =
    applicantLocalStorage.get();

  public publicApplicant: TPublicApplicationInput = defaultPublicApplicantInfo;
  public logInType: LoginFormType = LoginFormType.LogIn;

  public newPhoto: File | undefined = undefined;

  public resume: TApplicantResume | undefined | null = undefined;

  form: TApplicantForm = defaultApplicantForm;

  constructor() {
    makeAutoObservable(this);
  }

  get applicantAvatarSrc() {
    if (this.newPhoto) {
      return URL.createObjectURL(this.newPhoto);
    }

    if (this.applicant?.avatarUrl) {
      return getFileSrc(this.applicant.avatarUrl);
    }
  }

  get headerTitle() {
    if (this.applicant) {
      return this.applicant.name;
    }

    return "Без имени";
  }

  get defaultResumeData(): TCreateResume {
    return {
      title: "",
      description: resumeDescriptionTemplate,
      tags: [],
      salaryFrom: undefined,
      salaryTo: undefined,
      location: "",
      userId: this.applicant?.id ?? "",
      experienceLevel: ExperienceLevel.Junior,
    };
  }

  public setFormLogin(login: string) {
    this.form.login = login;
  }

  public setFormName(name: string) {
    this.form.name = name;
  }

  public setLoginType(type: LoginFormType) {
    this.logInType = type;
    this.form = defaultApplicantForm;
  }

  public setNewPhoto(photo: File | undefined) {
    this.newPhoto = photo;
  }

  public setApplicantField<K extends keyof TApplicant>(
    field: K,
    value: TApplicant[K]
  ) {
    if (this.applicant === undefined) return;

    this.applicant[field] = value;
  }

  get hasChanges() {
    if (!this.applicant || !this._originalApplicant) return false;

    const plainApplicant = toJS(this.applicant);
    const plainOriginal = toJS(this._originalApplicant);

    return !equal(plainApplicant, plainOriginal);
  }

  public async updateApplicantAvatar() {
    if (this.applicant === undefined || this.newPhoto === undefined) return;
    try {
      const applicant = await applicantApi.updateAvatar(
        this.applicant.id,
        this.newPhoto
      );

      this._setApplicant(applicant);
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при обновлении фото",
        color: "danger",
      });
    }
  }

  public async register() {
    try {
      const applicant = await applicantApi.register(this.form);

      this._setApplicant(applicant);
      this.getResume();
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
      const applicant = await applicantApi.login(this.form.login);

      this._setApplicant(applicant);
      this.getResume();
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при входе",
        color: "danger",
      });
    }
  }

  public async updateApplicantInfo() {
    if (this.applicant === undefined) return;

    try {
      const applicant = await applicantApi.updateApplicant(
        this.applicant!.id,
        this.applicant
      );

      runInAction(() => {
        addToast({
          title: "Данные профиля обновлены",
          color: "success",
        });

        this._setApplicant(applicant);
      });
    } catch (e) {
      console.log(e);
      addToast({
        title: "Ошибка",
        description: "Ошибка при обновлении данных профиля",
        color: "danger",
      });
    }
  }

  public resetChanges() {
    this.applicant = cloneDeep(this._originalApplicant);
  }

  public async getResume() {
    if (this.applicant === undefined) return;

    try {
      const resume = await applicantResumeApi.getResumeByUserId(
        this.applicant.id
      );

      runInAction(() => {
        this.resume = resume;
      });
    } catch {
      this.resume = null;
    }
  }

  public async createResume(resume: TCreateResume) {
    try {
      const newResume = await applicantResumeApi.addResume(resume);

      runInAction(() => {
        this.resume = newResume;
      });

      routerStore.navigate?.("/applicant/resume/");
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при создании резюме",
        color: "danger",
      });
    }
  }

  public async deleteResume() {
    if (!this.resume) return;

    try {
      await applicantResumeApi.deleteResume(this.resume.id);

      runInAction(() => {
        this.resume = null;
        routerStore.navigate?.("/applicant/resume/");
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при удалении резюме",
        color: "danger",
      });
    }
  }

  public async updateResume(resume: TApplicantResume) {
    try {
      const updatedResume = await applicantResumeApi.updateResume(resume);

      runInAction(() => {
        this.resume = updatedResume;

        routerStore.navigate?.("/applicant/resume/");
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при обновлении резюме",
        color: "danger",
      });
    }
  }

  public async uploadPdf(file: File) {
    if (!this.resume) return;

    try {
      const resume = await applicantResumeApi.uploadPdf(this.resume.id, file);

      runInAction(() => {
        this.resume = resume;
      });
      addToast({
        title: "Успех",
        description: "Резюме успешно загружено",
        color: "success",
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при загрузке резюме",
        color: "danger",
      });
    }
  }

  public logOut() {
    this.applicant = undefined;
    this.resume = undefined;
    applicantLocalStorage.remove();
  }

  private _setApplicant(applicant: TApplicant) {
    this.applicant = applicant;
    this._originalApplicant = cloneDeep(toJS(applicant));
    applicantLocalStorage.set(toJS(applicant));
  }
}

export const applicantStore = new ApplicantStore();
