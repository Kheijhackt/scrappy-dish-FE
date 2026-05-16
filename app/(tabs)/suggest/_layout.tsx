import { Stack } from "expo-router";

export default function SuggestLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Suggest" }} />
    </Stack>
  );
}
