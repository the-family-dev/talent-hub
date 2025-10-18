import apiClient from ".";

export interface IUniversityInternshipBase {
  id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt?: string;
  files?: string[];
  tags: string[];
  university?: {
    name: string;
    id: string;
    logoUrl?: string;
    location?: string;
  };
}

export interface IUniversityInternship extends IUniversityInternshipBase {
  universityId: string;
}

export type TCreateEditInternship = Omit<
  IUniversityInternship,
  "id" | "files"
> & {
  files?: File[];
};

class InternshipApi {
  public async getInternships() {
    const response = await apiClient.post<IUniversityInternshipBase[]>(
      "/internship"
    );

    return response.data;
  }

  public async addInternship(internship: TCreateEditInternship) {
    console.log(internship);

    const formData = new FormData();

    // Добавляем файлы, если есть
    if (internship.files?.length) {
      internship.files.forEach((file) => formData.append("files", file));
    }

    // Добавляем остальные поля
    formData.append("title", internship.title);
    if (internship.description)
      formData.append("description", internship.description);
    if (internship.location) formData.append("location", internship.location);
    formData.append("universityId", internship.universityId);
    if (internship.tags?.length) {
      internship.tags.forEach((tag) => formData.append("tags[]", tag));
    }

    const response = await apiClient.post("/internship/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }

  public async getVacancyById(id: string) {
    const response = await apiClient.get<IUniversityInternship>(
      `/internship/${id}`
    );

    return response.data;
  }

  public async deleteInternship(id: string) {
    await apiClient.delete(`/internship/${id}`);
  }

  public async updateInternship(id: string, internship: TCreateEditInternship) {
    const formData = new FormData();

    if (internship.files?.length) {
      internship.files.forEach((file) => formData.append("files", file));
    }

    formData.append("title", internship.title);
    if (internship.description)
      formData.append("description", internship.description);
    if (internship.location) formData.append("location", internship.location);
    formData.append("universityId", internship.universityId);
    if (internship.tags?.length) {
      internship.tags.forEach((tag) => formData.append("tags[]", tag));
    }

    const response = await apiClient.put(`/internship/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
}

export const internshipApi = new InternshipApi();
