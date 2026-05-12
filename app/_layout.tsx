import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import * as authEndpoints from "../services/authEndpoints";
import * as authStore from "../utils/authStore";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await authStore.getToken();
      if (token === null) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      const response = await authEndpoints.verifyMe();
      setIsAuthenticated(response);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === "(tabs)";
    if (!isAuthenticated && inTabsGroup) {
      router.replace("/googleAuth");
    } else if (isAuthenticated && !inTabsGroup) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
