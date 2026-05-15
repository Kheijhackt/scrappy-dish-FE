import * as userPreferencesEndpoints from "@/services/userPreferencesEndpoints";
import { UserPreferences } from "@/types/userPreferences";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, Text, View } from "react-native";

export default function PreferencesScreen() {
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);

  const mockUpdatePreferences: Partial<UserPreferences> = {
    available_ingredients: ["mustard", "beans", "egg"],
    cuisine_preferences: ["filipino"],
  };

  useFocusEffect(
    useCallback(() => {
      getUserPreferences();
    }, []),
  );

  const getUserPreferences = async () => {
    const response = await userPreferencesEndpoints.getUserPreferences();
    if (response) {
      setUserPreferences(response);
    }
  };

  const updateUserPreferences = async (
    userPreferences: Partial<UserPreferences>,
  ) => {
    const response =
      await userPreferencesEndpoints.updateUserPreferences(userPreferences);
    if (response) getUserPreferences();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Preferences Screen</Text>
      <Text>{userPreferences?.available_ingredients[0]}</Text>
      <Text>{userPreferences?.dietary_preferences[0]}</Text>
      <Text>{userPreferences?.cuisine_preferences[0]}</Text>
      <Text>{userPreferences?.dish_preferences[0]}</Text>
      <Text>{userPreferences?.available_equipments[0]}</Text>
      <Button
        title="Update"
        onPress={() => updateUserPreferences(mockUpdatePreferences)}
      />
    </View>
  );
}
