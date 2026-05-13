import { Stack } from "expo-router";

export default function SuggestLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Suggest" }} />
      <Stack.Screen
        name="preferences"
        options={{ presentation: "modal", title: "Preferences" }}
      />
    </Stack>
  );
}
