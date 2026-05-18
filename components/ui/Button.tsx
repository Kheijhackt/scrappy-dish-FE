import React from "react";
import { SizableText, Button as TamaguiButton, XStack } from "tamagui";

interface ButtonProps {
  name: string;
  onPress: () => void | Promise<void>;
  variant?: "primary" | "accent" | "outline";
  icon?: React.JSX.Element; // Accepts an instantiated JSX element like <Activity />
  width?: string | number; // New prop to control the length (e.g., "100%", 120, "auto")
}

export default function Button({
  name,
  onPress,
  variant = "primary",
  icon,
  width,
}: ButtonProps) {
  const isOutline = variant === "outline";
  const isAccent = variant === "accent";

  // Compute the matching color token for both text and icon to guarantee contrast
  const contentColor = isOutline
    ? "$color"
    : isAccent
      ? "$accent12" // Maps directly to your high-contrast accent text token
      : "$background";

  // Safely inject the theme token color directly into your custom JSX icon element
  const renderedIcon =
    icon && React.isValidElement(icon)
      ? React.cloneElement(icon as React.ReactElement<any>, {
          color: contentColor,
          size: 18, // Sensible fallback size matching mobile UI standards
        })
      : null;

  return (
    <TamaguiButton
      width={width} // Applies the custom length/width layout style dynamically
      borderWidth={1}
      borderColor={"$borderColor"}
      onPress={onPress}
      // Core Structural Layout
      height={52}
      borderRadius="$4"
      justifyContent="center"
      alignItems="center"
      paddingHorizontal="$4"
      // Theme Adaptive Backgrounds
      backgroundColor={
        isOutline ? "transparent" : isAccent ? "$accent9" : "$color"
      }
      // Micro-interactions
      transition="quick"
      pressStyle={{
        scale: 0.98,
        opacity: 0.9,
        borderBottomWidth: 2,
      }}
      hoverStyle={{
        opacity: 0.95,
      }}
    >
      {/* Dynamic Content Wrapper alignment */}
      <XStack alignItems="center" justifyContent="center" gap="$2">
        {renderedIcon}

        <SizableText
          fontWeight="700"
          letterSpacing={0.5}
          size="$3"
          color={contentColor}
        >
          {name}
        </SizableText>
      </XStack>
    </TamaguiButton>
  );
}
