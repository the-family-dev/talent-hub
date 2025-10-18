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

  // public async updateLogo(companyId: string, logo: File) {}
}

export const universityApi = new CompanyApi();
