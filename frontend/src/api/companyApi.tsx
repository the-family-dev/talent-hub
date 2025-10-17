import apiClient from ".";

export type TCompany = {
  id: string;
  name: string;
  login: string;
  logoUrl?: string;
};

type TRegisterCompany = Omit<TCompany, "id">;

class CompanyApi {
  public async register(company: TRegisterCompany) {
    const result = await apiClient.post<TCompany>("/company/register", company);

    return result.data;
  }

  public async login(login: string) {
    const result = await apiClient.post<TCompany>("/company/login", { login });

    return result.data;
  }

  public async updateLogo(companyId: string, logo: File) {
    const formData = new FormData();
    formData.append("file", logo);

    const result = await apiClient.post<TCompany>(
      `/company/${companyId}/logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return result.data;
  }

  public async updateCompany(companyId: string, company: TCompany) {
    const result = await apiClient.put<TCompany>(
      `/company/${companyId}`,
      company
    );

    return result.data;
  }
}

export const companyApi = new CompanyApi();
