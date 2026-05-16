import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui } from "tamagui"; // Or '@tamagui/core' if you went the core route
import { themes } from "./themes";

export const config = createTamagui({
  ...defaultConfig,
  themes,
});
