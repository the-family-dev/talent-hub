import apiClient from ".";
import type { ApplicationStatus } from "../types/rootTypes";

class ApplicationApi {
  public async updateStatus(applicationId: string, status: ApplicationStatus) {
    const response = await apiClient.put(`/application/${applicationId}`, {
      status,
    });

    console.log(response.data);
  }
}

export const applicationApi = new ApplicationApi();
