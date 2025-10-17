import apiClient from ".";

export type TApplicant = {
  id: string;
  name: string;
  login: string;
  avatarUrl?: string;
};

type TRegisterApplicant = Omit<TApplicant, "id">;

class ApplicantApi {
  public async register(applicant: TRegisterApplicant) {
    const result = await apiClient.post<TApplicant>(
      "/applicant/register",
      applicant
    );

    return result.data;
  }

  public async login(login: string) {
    const result = await apiClient.post<TApplicant>("/applicant/login", {
      login,
    });

    return result.data;
  }

  public async updateAvatar(applicantId: string, avatar: File) {
    const formData = new FormData();
    formData.append("file", avatar);

    const result = await apiClient.post<TApplicant>(
      `/applicant/${applicantId}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return result.data;
  }

  public async updateApplicant(applicantId: string, applicant: TApplicant) {
    const result = await apiClient.put<TApplicant>(
      `/applicant/${applicantId}`,
      applicant
    );

    return result.data;
  }
}

export const applicantApi = new ApplicantApi();
