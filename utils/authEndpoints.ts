import { API_ENDPOINTS } from "@/constants/config";
import * as apiHelper from "./apiHelper";
import * as authStore from "./authStore";

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
