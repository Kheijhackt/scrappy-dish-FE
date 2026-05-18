import React from "react";
import { SizableText, Button as TamaguiButton, XStack } from "tamagui";

interface ButtonProps {
  name: string;
  onPress: () => void | Promise<void>;
  variant?: "primary" | "accent" | "outline";
  icon?: React.JSX.Element; // Accepts an instantiated JSX element like <Activity />
  width?: string | number; // Controls length (e.g., "100%", 120, "auto")
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

  // Compute colors for text/icon
  const contentColor = isOutline
    ? "$color"
    : isAccent
      ? "$accent12"
      : "$background";

  const renderedIcon =
    icon && React.isValidElement(icon)
      ? React.cloneElement(icon as React.ReactElement<any>, {
          color: contentColor,
          size: 18,
        })
      : null;

  return (
    <TamaguiButton
      width={width}
      onPress={onPress}
      height={52}
      borderRadius="$4"
      justifyContent="center"
      alignItems="center"
      paddingHorizontal="$4"
      borderWidth={1}
      borderColor={isOutline ? "$borderColor" : "transparent"}
      // Default States
      backgroundColor={
        isOutline ? "transparent" : isAccent ? "$accent9" : "$color"
      }
      // Essential for pressStyle to animate smoothly

      // Interactive Styles
      pressStyle={{
        scale: 0.97,
        opacity: 0.9,
        // Darken background on press
        backgroundColor: isOutline
          ? "$backgroundHover"
          : isAccent
            ? "$accent10"
            : "$colorPress",
      }}
      hoverStyle={{
        cursor: "pointer",
        backgroundColor: isOutline
          ? "$backgroundHover"
          : isAccent
            ? "$accent10"
            : "$colorHover",
      }}
    >
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
