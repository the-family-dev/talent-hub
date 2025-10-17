import { makeAutoObservable, runInAction } from "mobx";
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

class ApplicantStore {
  public applicant: TApplicant | undefined = applicantLocalStorage.get();

  public logInType: LoginFormType = LoginFormType.LogIn;

  public applicantName = applicantLocalStorage.get()?.name || "";

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

  get defaultResumeData(): TCreateResume {
    return {
      title: "",
      description: resumeDescriptionTemplate,
      tags: [],
      salaryFrom: 0,
      salaryTo: 0,
      location: "",
      userId: this.applicant?.id ?? "",
      experienceLevel: ExperienceLevel.Junior,
    };
  }

  get resumePdfUrl() {
    if (this.resume?.pdfUrl) {
      return getFileSrc(this.resume.pdfUrl);
    }
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

  public setApplicantName(name: string) {
    this.applicantName = name;
  }

  get hasChanges() {
    return Boolean(this.applicantName !== this.applicant?.name);
  }

  public async updateApplicantAvatar() {
    if (this.applicant === undefined || this.newPhoto === undefined) return;
    try {
      const applicant = await applicantApi.updateAvatar(
        this.applicant.id,
        this.newPhoto
      );

      runInAction(() => {
        this.applicant = applicant;
        applicantLocalStorage.set(applicant);
      });
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

      runInAction(() => {
        this.applicant = applicant;
        applicantLocalStorage.set(applicant);
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
      const applicant = await applicantApi.login(this.form.login);

      runInAction(() => {
        this.applicant = applicant;
        applicantLocalStorage.set(applicant);
      });
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
      const applicant = await applicantApi.updateApplicant(this.applicant!.id, {
        ...this.applicant,
        name: this.applicantName,
      });

      runInAction(() => {
        addToast({
          title: "Данные профиля обновлены",
          color: "success",
        });

        this.applicant = applicant;
        this.applicantName = applicant.name;

        applicantLocalStorage.set(applicant);
      });
    } catch {
      addToast({
        title: "Ошибка",
        description: "Ошибка при обновлении данных профиля",
        color: "danger",
      });
    }
  }

  public resetChanges() {
    this.applicantName = this.applicant?.name || "";
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

      console.log(newResume);

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
    applicantLocalStorage.set(undefined);
  }
}

export const applicantStore = new ApplicantStore();
