import { makeAutoObservable, runInAction } from "mobx";
import { vacanciesApi, type TVacancy } from "../api/vacanciesApi";
import { addToast } from "@heroui/react";

class AppStore {
  vacancies: TVacancy[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public async fetchVacancies() {
    try {
      const vacancies = await vacanciesApi.getAllVacancies();

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
    vacanciesApi.addVacancy();
  }
}

export const store = new AppStore();
