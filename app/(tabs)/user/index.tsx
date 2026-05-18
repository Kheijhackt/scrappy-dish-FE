import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Loading from "@/components/ui/Loading";
import * as userEndpoints from "@/services/userEndpoints";
import * as userPreferencesEndpoints from "@/services/userPreferencesEndpoints";
import { User } from "@/types/user";
import { UserPreferences } from "@/types/userPreferences";
import { CircleX, Save, Settings } from "@tamagui/lucide-icons-2";
import { ImageBackground } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Accordion,
  Heading,
  Input,
  Paragraph,
  ScrollView,
  SizableText,
  Button as TButton,
  XStack,
  YStack,
} from "tamagui";

export default function UserScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  // Fully controlled accordion state - empty array keeps everything closed by default
  const [openSections, setOpenSections] = useState<string[]>([]);

  // Local temporary inputs for each individual accordion category
  const [newInputs, setNewInputs] = useState({
    available_ingredients: "",
    dietary_preferences: "",
    cuisine_preferences: "",
    dish_preferences: "",
    available_equipments: "",
  });

  // Fetch profiles and configuration tokens on screen focus
  const loadUserData = useCallback(async () => {
    setIsLoading(true);
    const [userData, prefData] = await Promise.all([
      userEndpoints.getUser(),
      userPreferencesEndpoints.getUserPreferences(),
    ]);
    if (userData) setUser(userData);
    if (prefData) setPreferences(prefData);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData]),
  );

  // Appends new entry locally to specific categories
  const handleAddItem = (category: keyof UserPreferences) => {
    const valueToAdd = newInputs[category].trim();
    if (!valueToAdd || !preferences) return;

    const currentList = preferences[category] || [];
    setPreferences({
      ...preferences,
      [category]: [...currentList, valueToAdd],
    });

    setNewInputs({
      ...newInputs,
      [category]: "",
    });
  };

  // Removes item locally by index matching
  const handleRemoveItem = (
    category: keyof UserPreferences,
    indexToRemove: number,
  ) => {
    if (!preferences) return;

    const currentList = preferences[category] || [];
    setPreferences({
      ...preferences,
      [category]: currentList.filter((_, index) => index !== indexToRemove),
    });
  };

  // Dispatches local modifications to the backend endpoint
  const saveAllPreferences = async () => {
    setIsLoading(true);
    if (preferences) {
      await userPreferencesEndpoints.updateUserPreferences(preferences);
      const dynamicUpdate = await userPreferencesEndpoints.getUserPreferences();
      if (dynamicUpdate) setPreferences(dynamicUpdate);
    }
    setIsLoading(false);
    setShowDialog(true);
  };

  // Discards local changes by pulling down the original server data again
  const discardAllChanges = async () => {
    setIsLoading(true);
    const prefData = await userPreferencesEndpoints.getUserPreferences();
    if (prefData) setPreferences(prefData);

    // Clear out any half-typed inputs too
    setNewInputs({
      available_ingredients: "",
      dietary_preferences: "",
      cuisine_preferences: "",
      dish_preferences: "",
      available_equipments: "",
    });

    setIsLoading(false);
  };

  const handleSettingsPress = () => {
    console.log("Settings option clicked");
  };

  const preferenceConfig = [
    { key: "available_ingredients", label: "Available Ingredients" },
    { key: "dietary_preferences", label: "Dietary Preferences" },
    { key: "cuisine_preferences", label: "Cuisine Preferences" },
    { key: "dish_preferences", label: "Dish Preferences" },
    { key: "available_equipments", label: "Available Equipment" },
  ] as const;

  return (
    <ScrollView backgroundColor="$background" flex={1}>
      <SafeAreaView>
        <YStack padding="$4" gap="$5">
          <Loading isLoading={isLoading} />
          <Dialog
            isShowing={showDialog}
            title="Notice"
            description="Your preferences have been saved."
            button1Name="Okay"
            button1Callback={() => setShowDialog(false)}
          />
          {/* Upper Profile Layout Section */}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <YStack gap="$1" flex={1}>
              <Heading size="$7" color="$color">
                Hi! {user?.name || "User"}
              </Heading>
              <Paragraph size="$2" color="$color" opacity={0.6}>
                Manage your cooking parameters
              </Paragraph>
            </YStack>

            <XStack alignItems="center" gap="$3">
              <Button
                name=""
                onPress={handleSettingsPress}
                icon={<Settings />}
              />

              <YStack
                width={65}
                height={65}
                borderRadius={32.5}
                overflow="hidden"
                borderWidth={1}
                borderColor="$borderColor"
                backgroundColor="$backgroundHover"
              >
                {user?.avatar && (
                  <ImageBackground
                    source={{ uri: user.avatar }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </YStack>
            </XStack>
          </XStack>

          {/* Accordions Section */}
          <YStack gap="$2">
            <Heading size="$4" color="$color" marginBottom="$1" opacity={0.8}>
              Your Preferences
            </Heading>

            <Accordion
              type="multiple"
              collapsable
              width="100%"
              value={openSections}
              onValueChange={setOpenSections}
            >
              {preferenceConfig.map((config) => {
                const currentCategoryItems = preferences?.[config.key] || [];

                return (
                  <Accordion.Item
                    value={config.key}
                    key={config.key}
                    borderWidth={1}
                    borderColor="$borderColor"
                    borderRadius="$3"
                    marginBottom="$2"
                    overflow="hidden"
                  >
                    <Accordion.Trigger
                      flexDirection="row"
                      justifyContent="space-between"
                      padding="$3"
                      backgroundColor="$backgroundHover"
                    >
                      {({ open }: { open: boolean }) => (
                        <XStack
                          width="100%"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <SizableText
                            size="$3"
                            fontWeight="600"
                            color="$color"
                          >
                            {config.label} ({currentCategoryItems.length})
                          </SizableText>
                          <SizableText
                            size="$2"
                            color="$accentColor"
                            fontWeight="700"
                          >
                            {open ? "▲" : "▼"}
                          </SizableText>
                        </XStack>
                      )}
                    </Accordion.Trigger>

                    <Accordion.Content
                      backgroundColor="$background"
                      padding="$3"
                      gap="$3"
                    >
                      {/* Fixed Input Row with safe cross-platform height bounds */}
                      <XStack gap="$2" width="100%" alignItems="center">
                        <Input
                          flex={1}
                          height={44}
                          paddingVertical="$2"
                          placeholder={`Add ${config.label.toLowerCase()}...`}
                          value={newInputs[config.key]}
                          onChangeText={(text) =>
                            setNewInputs({ ...newInputs, [config.key]: text })
                          }
                          backgroundColor="$background"
                          borderColor="$borderColor"
                          color="$color"
                        />
                        <TButton
                          size="$3"
                          height={44}
                          backgroundColor="$accentBackground"
                          onPress={() => handleAddItem(config.key)}
                        >
                          <SizableText fontWeight="700" color="$background">
                            +
                          </SizableText>
                        </TButton>
                      </XStack>

                      {/* Content List */}
                      <YStack gap="$1.5">
                        {currentCategoryItems.map((item, index) => (
                          <XStack
                            key={`${config.key}-${index}`}
                            justifyContent="space-between"
                            alignItems="center"
                            paddingVertical="$1.5"
                            paddingHorizontal="$2"
                            borderRadius="$2"
                            backgroundColor="$backgroundHover"
                          >
                            <Paragraph size="$3" color="$color">
                              {item}
                            </Paragraph>

                            <TButton
                              size="$2"
                              paddingHorizontal="$2"
                              chromeless
                              onPress={() =>
                                handleRemoveItem(config.key, index)
                              }
                            >
                              <SizableText
                                size="$4"
                                fontWeight="700"
                                color="$accentColor"
                              >
                                -
                              </SizableText>
                            </TButton>
                          </XStack>
                        ))}

                        {currentCategoryItems.length === 0 && (
                          <Paragraph
                            size="$2"
                            color="$color"
                            opacity={0.4}
                            textAlign="center"
                            paddingVertical="$2"
                          >
                            No items added yet.
                          </Paragraph>
                        )}
                      </YStack>
                    </Accordion.Content>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </YStack>

          {/* Action Button Section Container */}
          <YStack gap="$2.5" marginTop="$2">
            {/* Main Action Button */}
            <Button
              name="Save Preferences"
              onPress={saveAllPreferences}
              icon={<Save />}
            />

            {/* Outlined Discard Changes Button */}
            <Button
              name="Discard Changes"
              onPress={discardAllChanges}
              icon={<CircleX />}
              variant="outline"
            />
          </YStack>
        </YStack>
      </SafeAreaView>
    </ScrollView>
  );
}
