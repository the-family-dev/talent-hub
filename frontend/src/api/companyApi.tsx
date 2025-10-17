import apiClient from ".";

export type TCompany = {
  id: string;
  name: string;
  login: string;
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
}

export const companyApi = new CompanyApi();
