import { Stack } from "expo-router";

export default function RecipesLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Recipes" }} />
      <Stack.Screen name="[id]" options={{ title: "Detailed Recipe" }} />
    </Stack>
  );
}
