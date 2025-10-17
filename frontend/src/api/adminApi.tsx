import apiClient from ".";

class AdminApi {
  public async getAllVacancy() {
    const response = await apiClient.get("/vacancies");
    return response.data;
  }
}

export const adminApi = new AdminApi();
