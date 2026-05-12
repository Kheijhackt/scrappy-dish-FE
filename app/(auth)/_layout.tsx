import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="googleAuth" options={{ headerShown: false }} />
    </Stack>
  );
}
