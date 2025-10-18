import { makeAutoObservable, runInAction } from "mobx";
import {
  catalogApi,
  type TCatalogCompany,
  type TCatalogTag,
  type TCatalogUniversity,
} from "../../api/catalogApi";
import { addToast } from "@heroui/react";

class CatalogStore {
  allTags: TCatalogTag[] = [];
  allCompanies: TCatalogCompany[] = [];
  allUniversities: TCatalogUniversity[] = [];

  public async fetchCatalog() {
    try {
      const [tags, companies, universities] = await Promise.all([
        catalogApi.getAllTags(),
        catalogApi.getAllCompanyList(),
        catalogApi.getAllUniversityList(),
      ]);

      runInAction(() => {
        this.allTags = tags;
        this.allCompanies = companies;
        this.allUniversities = universities;
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
