import { makeAutoObservable, runInAction } from "mobx";
import {
  catalogApi,
  type TCatalogCompany,
  type TCatalogTag,
} from "../../api/catalogApi";
import { addToast } from "@heroui/react";

class CatalogStore {
  allTags: TCatalogTag[] = [];
  allCompanies: TCatalogCompany[] = [];

  public async fetchCatalog() {
    try {
      const [tags, companies] = await Promise.all([
        catalogApi.getAllTags(),
        catalogApi.getAllCompanyList(),
      ]);

      runInAction(() => {
        this.allTags = tags;
        this.allCompanies = companies;
      });
    } catch {
      addToast({
        title: "Ошибка получения данных",
        color: "danger",
      });
    }
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const catalogStore = new CatalogStore();
