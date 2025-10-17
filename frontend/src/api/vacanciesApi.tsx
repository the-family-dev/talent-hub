import apiClient from ".";

export type TVacancy = {
  id: string;
  title: string;
  description?: string;
  slary?: string;
};

class VacanciesApi {
  public async addVacancy() {
    const response = await apiClient.post("/vacancies", {
      title: "test",
      description: "1234",
      salary: "12345",
      id: 12,
    });

    console.log(response);
  }

  public async getAllVacancies() {
    const response = await apiClient.get<TVacancy[]>("/vacancies");

    return response.data;
  }
}

export const vacanciesApi = new VacanciesApi();
