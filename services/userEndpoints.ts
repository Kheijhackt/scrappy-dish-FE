import { API_ENDPOINTS } from "@/constants/config";
import { User } from "../types/user";
import * as apiHelper from "../utils/apiHelper";
import * as authStore from "../utils/authStore";

export async function getUser(): Promise<User | null> {
  let result = null;

  const response = await apiHelper.fetchEndpoint("GET", API_ENDPOINTS.USER);
  if (response.status === 200) {
    result = {
      id: response.data.id,
      name: response.data.name,
      avatar: response.data.avatar,
    };
  }

  return result;
}

export async function updateUser(user: Partial<User>): Promise<User | null> {
  let result = null;

  const response = await apiHelper.fetchEndpoint(
    "PATCH",
    API_ENDPOINTS.USER,
    user,
  );
  if (response.status === 200) {
    result = {
      id: response.data.id,
      name: response.data.name,
      avatar: response.data.avatar,
    };
  }

  return result;
}

export async function deleteUser(): Promise<boolean> {
  let result = false;
  const response = await apiHelper.fetchEndpoint("DELETE", API_ENDPOINTS.USER);
  if (response.status === 200) {
    result = true;
    await authStore.deleteToken();
  }

  return result;
}
