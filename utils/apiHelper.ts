import axios, { Method } from "axios";
import { API_CONFIG } from "../constants/config";
import * as authStore from "./authStore";

export async function fetchEndpoint(
  method: Method,
  relativePath: string,
  data: any = null,
): Promise<any> {
  const token = await authStore.getToken();

  const config = {
    method: method,
    url: `${API_CONFIG.BASE_URL}/api${relativePath}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error with ${method} request to ${relativePath}:`, error);
    return null;
  }
}
