import * as userPreferencesEndpoints from "@/services/userPreferencesEndpoints";
import { UserPreferences } from "@/types/userPreferences";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

export default function PreferencesScreen() {
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);

  useFocusEffect(
    useCallback(() => {
      const getUserPreferences = async () => {
        const response = await userPreferencesEndpoints.getUserPreferences();
        if (response) {
          setUserPreferences(response);
        }
      };
      getUserPreferences();
    }, []),
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Preferences Screen</Text>
      <Text>{userPreferences?.available_ingredients[0]}</Text>
      <Text>{userPreferences?.dietary_preferences[0]}</Text>
      <Text>{userPreferences?.cuisine_preferences[0]}</Text>
      <Text>{userPreferences?.dish_preferences[0]}</Text>
      <Text>{userPreferences?.available_equipments[0]}</Text>
    </View>
  );
}
