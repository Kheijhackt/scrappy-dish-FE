import { CookingPot, Home, Sparkles, User } from "@tamagui/lucide-icons-2";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useTheme, YStack } from "tamagui";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Match the background of the tab bar directly to your Tamagui theme tokens
        tabBarStyle: {
          backgroundColor: theme?.background?.val,
          borderTopColor: theme?.borderColor?.val,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 88 : 68,
          paddingBottom: Platform.OS === "ios" ? 28 : 12,
          paddingTop: 10,
        },
        // We handle the text color states dynamically below, so we override defaults here
        tabBarActiveTintColor: theme?.accentColor?.val,
        tabBarInactiveTintColor: theme?.color?.val,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <YStack
              alignItems="center"
              justifyContent="center"
              gap="$1"
              scale={focused ? 1.1 : 1} // Pure hardware-accelerated transform scaling
            >
              <Home size={26} color={color} />
            </YStack>
          ),
          tabBarLabel: () => null, // Hides native text to prevent duplicate rendering bugs
        }}
      />

      <Tabs.Screen
        name="suggest"
        options={{
          title: "Suggest",
          tabBarIcon: ({ focused, color }) => (
            <YStack
              alignItems="center"
              justifyContent="center"
              gap="$1"
              scale={focused ? 1.1 : 1}
            >
              <Sparkles size={25} color={color} />
            </YStack>
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recipes",
          tabBarIcon: ({ focused, color }) => (
            <YStack
              alignItems="center"
              justifyContent="center"
              gap="$1"
              scale={focused ? 1.1 : 1}
            >
              <CookingPot size={25} color={color} />
            </YStack>
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ focused, color }) => (
            <YStack
              alignItems="center"
              justifyContent="center"
              gap="$1"
              scale={focused ? 1.1 : 1}
            >
              <User size={25} color={color} />
            </YStack>
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
}
