import React from "react";
import { Button as TamaguiButton } from "tamagui";

interface ButtonIconProps {
  icon: React.JSX.Element; // Accepts an instantiated JSX element like <Activity />
  onPress?: () => void | Promise<void>;
  variant?: "primary" | "outline";
  radius?: number; // Maps to structural radius dimensions
}

export default function ButtonIcon({
  icon,
  onPress = () => console.log("ButtonIcon pressed"),
  variant = "primary",
  radius = 12,
}: ButtonIconProps) {
  const isOutline = variant === "outline";

  // Compute the matching token color to guarantee contrast with backgrounds
  const contentColor = isOutline ? "$color" : "$background";

  // Safely inject styling details directly into your icon element layout
  const renderedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        color: contentColor,
        size: radius * 1.2, // Dynamically scales icon size relative to the button size
      })
    : null;

  // The button's layout diameter is calculated proportionally based on the radius
  const diameter = radius * 3.5;

  return (
    <TamaguiButton
      onPress={onPress}
      // Core Structural Circular Geometry
      width={diameter}
      height={diameter}
      borderRadius={9999} // Forces perfect circularity across platforms
      padding={0}
      justifyContent="center"
      alignItems="center"
      borderWidth={1}
      borderColor={isOutline ? "$borderColor" : "transparent"}
      // Theme Adaptive Backgrounds matching your core system configuration
      backgroundColor={isOutline ? "transparent" : "$color"}
      // FIX: Standard driver configuration property hook for Tamagui micro-interactions
      // Interactive Snappy Feedback States
      pressStyle={{
        scale: 0.95,
        opacity: 0.9,
        backgroundColor: isOutline ? "$backgroundPress" : "$colorPress",
      }}
      hoverStyle={{
        cursor: "pointer",
        backgroundColor: isOutline ? "$backgroundHover" : "$colorHover",
      }}
    >
      {renderedIcon}
    </TamaguiButton>
  );
}
