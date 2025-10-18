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

export type TCatalogUniversity = {
  id: string;
  name: string;
  location?: string;
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

  public async getAllUniversityList() {
    const response = await apiClient.get<TCatalogUniversity[]>(
      "catalog/university"
    );
    return response.data;
  }
}

export const catalogApi = new CatalogApi();
