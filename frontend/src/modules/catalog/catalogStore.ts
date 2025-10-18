import { makeAutoObservable, runInAction } from "mobx";
import {
  catalogApi,
  type TCatalogCompany,
  type TCatalogTag,
} from "../../api/catalogApi";
import { addToast } from "@heroui/react";

class CatalogStore {
  tags: TCatalogTag[] = [];
  companies: TCatalogCompany[] = [];

  public async fetchCatalog() {
    try {
      const [tags, companies] = await Promise.all([
        catalogApi.getAllTags(),
        catalogApi.getAllCompanyList(),
      ]);

      runInAction(() => {
        this.tags = tags;
        this.companies = companies;
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
