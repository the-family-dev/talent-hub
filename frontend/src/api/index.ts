import axios from "axios";

export const baseUrl = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: baseUrl || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export function getFileSrc(localPath: string) {
  return `${baseUrl}${localPath}`;
}

export default apiClient;
