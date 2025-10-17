import apiClient from ".";

type TPingResponse = {
  title: string;
};

class PingApi {
  public async ping() {
    const response = await apiClient.get<TPingResponse>("/test/ping");

    return response.data;
  }
}

export const pingApi = new PingApi();
