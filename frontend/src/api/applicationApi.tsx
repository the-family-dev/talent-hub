import apiClient from ".";
import type { ApplicationStatus, ExperienceLevel } from "../types/rootTypes";

// Тип для данных публичного отклика
export type TPublicApplicationInput = {
  name: string;
  phone: string;
  email: string;
  vacancyId: string;
  title: string;
  telegram?: string;
  experienceLevel: ExperienceLevel;
  description?: string;
  note?: string;
  pdfFile?: File; // файл PDF
};

class ApplicationApi {
  // Обновление статуса отклика
  public async updateStatus(applicationId: string, status: ApplicationStatus) {
    const response = await apiClient.put(`/application/${applicationId}`, {
      status,
    });
    return response.data;
  }

  // Создание публичного отклика (без регистрации)
  public async createPublicApplication(data: TPublicApplicationInput) {
    const formData = new FormData();

    // Добавляем файл PDF, если есть
    if (data.pdfFile) {
      formData.append("file", data.pdfFile);
    }

    // Добавляем остальные поля
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    if (data.telegram) formData.append("telegram", data.telegram);
    formData.append("vacancyId", data.vacancyId);
    formData.append("title", data.title);
    formData.append("experienceLevel", data.experienceLevel);
    if (data.description) formData.append("description", data.description);
    if (data.note) formData.append("note", data.note);

    const response = await apiClient.post("/application/public", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
}

export const applicationApi = new ApplicationApi();
