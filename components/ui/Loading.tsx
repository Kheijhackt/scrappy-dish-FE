import React from "react";
import { Dimensions } from "react-native";
import { GetProps, Spinner, YStack, useTheme } from "tamagui";

type SpinnerProps = GetProps<typeof Spinner>;

interface LoadingProps {
  isLoading: boolean;
  size?: SpinnerProps["size"];
  color?: string;
}

// Get the exact pixel height of the device screen window
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Loading({
  isLoading,
  size = "large",
  color,
}: LoadingProps) {
  const theme = useTheme();

  if (!isLoading) return null;

  return (
    <YStack
      position="absolute"
      top={0}
      left={0}
      right={0}
      // Force a minimum height matching the device screen so it spans downward even if the screen has 0 content
      minHeight={SCREEN_HEIGHT}
      zIndex={1000}
      alignItems="center"
      // We manually offset the centering to account for top headers/navbars so it hits the true optical center
      justifyContent="flex-start"
      paddingTop={SCREEN_HEIGHT / 3}
      backgroundColor="$background"
      opacity={0.7}
      importantForAccessibility="no-hide-descendants"
      accessibilityViewIsModal={true}
    >
      <Spinner
        size={size}
        color={color || theme.accentColor?.val || "$accentColor"}
        scale={2}
      />
    </YStack>
  );
}
