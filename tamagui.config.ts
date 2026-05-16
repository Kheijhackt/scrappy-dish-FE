import { createAnimations } from "@tamagui/animations-react-native";
import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui } from "tamagui";
import { themes } from "./themes";

// Define the animation profiles required by interactive components like Sheet and Accordion
const animations = createAnimations({
  fast: {
    type: "spring",
    damping: 20,
    mass: 1,
    stiffness: 250,
  },
  medium: {
    type: "spring",
    damping: 15,
    mass: 1,
    stiffness: 120, // Satisfies your animation="medium" requirement
  },
  slow: {
    type: "spring",
    damping: 15,
    mass: 1,
    stiffness: 40,
  },
});

export const config = createTamagui({
  ...defaultConfig,
  animations, // Injects the driver into your core design system config
  themes,
});
