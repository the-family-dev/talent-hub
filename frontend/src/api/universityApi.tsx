import apiClient from ".";

export type TUniversity = {
  id: string;
  name: string;
  login: string;
  logoUrl?: string;
};

type TRegisterUniversity = Omit<TUniversity, "id">;

class CompanyApi {
  public async register(company: TRegisterUniversity) {
    const result = await apiClient.post<TUniversity>(
      "/university/register",
      company
    );

    return result.data;
  }

  public async login(login: string) {
    const result = await apiClient.post<TUniversity>("/university/login", {
      login,
    });

    return result.data;
  }

  public async updateLogo(companyId: string, logo: File) {
    const formData = new FormData();
    formData.append("file", logo);

    const result = await apiClient.post<TUniversity>(
      `/university/${companyId}/logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return result.data;
  }

  public async updateCompany(companyId: string, company: TUniversity) {
    const result = await apiClient.put<TUniversity>(
      `/university/${companyId}`,
      company
    );

    return result.data;
  }
}

export const universityApi = new CompanyApi();
