import axios, { Method } from "axios";
import { API_CONFIG } from "../constants/config";
import * as authStore from "./authStore";
import { logger, LogLevel } from "./logger";

export async function fetchEndpoint(
  method: Method,
  relativePath: string,
  data: any = null,
): Promise<any> {
  const fName = fetchEndpoint.name;
  const token = await authStore.getToken();

  const config = {
    method: method,
    url: `${API_CONFIG.BASE_URL}/api${relativePath}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    logger(fName, response.data);
    return response;
  } catch (error: any) {
    if (error.response) {
      logger(fName, error.response.status, LogLevel.WARN);
      if (error.response.status === 401) {
        await authStore.deleteToken();
      }
      return error.response;
    }
  }
}
