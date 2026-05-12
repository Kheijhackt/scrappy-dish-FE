import { API_ENDPOINTS } from "@/constants/config";
import * as apiHelper from "../utils/apiHelper";
import * as authStore from "../utils/authStore";

export async function verifyMe(): Promise<boolean> {
  let result = false;
  const token = await authStore.getToken();
  if (!token) {
    return result;
  }

  const response = await apiHelper.fetchEndpoint(
    "GET",
    API_ENDPOINTS.VERIFY_ME,
  );
  result = response.status === 200 ? true : false;

  return result;
}

export async function googleAuth(id_token: string): Promise<boolean> {
  let result = false;
  const response = await apiHelper.fetchEndpoint(
    "POST",
    API_ENDPOINTS.AUTH_GOOGLE,
    { id_token },
  );

  if (response.status === 200) {
    const token = await authStore.saveToken(response?.data?.token);
    result = token !== null ? true : false;
  }

  return result;
}

export async function logout(): Promise<boolean> {
  let result = false;
  const response = await apiHelper.fetchEndpoint("GET", API_ENDPOINTS.LOGOUT);
  result = response.status === 200 ? true : false;

  if (result) {
    await authStore.deleteToken();
  }
  return result;
}
