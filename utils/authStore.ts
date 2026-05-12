import * as SecureStore from "expo-secure-store";
let cachedToken: string | null = null;

export async function saveToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}

export async function getToken(): Promise<string | null> {
  if (cachedToken) return cachedToken;

  cachedToken = await SecureStore.getItemAsync("token");
  return cachedToken;
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync("token");
}
