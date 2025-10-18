// Апи для получения списков
import apiClient from ".";

export type TCatalogTag = {
  id: string;
  name: string;
};

export type TCatalogCompany = {
  id: string;
  name: string;
  logoUrl?: string;
};

class CatalogApi {
  public async getAllTags() {
    const response = await apiClient.get<TCatalogTag[]>("/catalog/tags");
    return response.data;
  }

  public async getAllCompanyList() {
    const response = await apiClient.get<TCatalogCompany[]>("catalog/company");
    return response.data;
  }
}

export const catalogApi = new CatalogApi();
