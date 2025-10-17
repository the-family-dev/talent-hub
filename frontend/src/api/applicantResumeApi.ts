import apiClient from ".";
import type { ExperienceLevel } from "../types/rootTypes";

export type TApplicantResume = {
  id: string;
  title: string;
  description?: string;
  salaryFrom?: number;
  salaryTo?: number;
  location?: string;
  pdfUrl?: string;
  tags: string[];
  experienceLevel: ExperienceLevel;
  userId: string;
};

export type TCreateResume = Omit<TApplicantResume, "id">;

class ApplicantResumeApi {
  public async getResumeByUserId(userId: string) {
    const response = await apiClient.get<TApplicantResume>(`/resume/${userId}`);

    return response.data;
  }

  public async addResume(resume: TCreateResume) {
    const response = await apiClient.post<TApplicantResume>("/resume", resume);

    return response.data;
  }

  public async deleteResume(resumeId: string) {
    await apiClient.delete(`/resume/${resumeId}`);
  }

  public async updateResume(resume: TApplicantResume) {
    const response = await apiClient.put<TApplicantResume>(
      `/resume/${resume.id}`,
      resume
    );

    return response.data;
  }

  public async uploadPdf(resumeId: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<TApplicantResume>(
      `/resume/${resumeId}/pdf`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }
}

export const applicantResumeApi = new ApplicantResumeApi();
