import * as SecureStore from "expo-secure-store";

export async function saveToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}

export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync("token");
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync("token");
}
