import {
  green,
  greenDark,
  red,
  redDark,
  yellow,
  yellowDark,
} from "@tamagui/colors";
import { createV5Theme, defaultChildrenThemes } from "@tamagui/config/v5";
import { v5ComponentThemes } from "@tamagui/themes/v5";

const darkPalette = [
  "hsla(0, 16%, 0%, 1)",
  "hsla(0, 16%, 6%, 1)",
  "hsla(0, 16%, 11%, 1)",
  "hsla(0, 16%, 17%, 1)",
  "hsla(0, 16%, 22%, 1)",
  "hsla(0, 16%, 28%, 1)",
  "hsla(0, 16%, 33%, 1)",
  "hsla(0, 16%, 39%, 1)",
  "hsla(0, 16%, 44%, 1)",
  "hsla(0, 16%, 50%, 1)",
  "hsla(0, 15%, 93%, 1)",
  "hsla(0, 15%, 99%, 1)",
];
const lightPalette = [
  "hsla(0, 16%, 99%, 1)",
  "hsla(0, 16%, 94%, 1)",
  "hsla(0, 16%, 88%, 1)",
  "hsla(0, 16%, 83%, 1)",
  "hsla(0, 16%, 77%, 1)",
  "hsla(0, 16%, 72%, 1)",
  "hsla(0, 16%, 66%, 1)",
  "hsla(0, 16%, 61%, 1)",
  "hsla(0, 16%, 55%, 1)",
  "hsla(0, 16%, 50%, 1)",
  "hsla(0, 15%, 15%, 1)",
  "hsla(0, 15%, 1%, 1)",
];

// Your custom accent color theme
const accentLight = {
  accent1: "hsla(0, 63%, 40%, 1)",
  accent2: "hsla(0, 63%, 43%, 1)",
  accent3: "hsla(0, 63%, 46%, 1)",
  accent4: "hsla(0, 63%, 48%, 1)",
  accent5: "hsla(0, 63%, 51%, 1)",
  accent6: "hsla(0, 63%, 54%, 1)",
  accent7: "hsla(0, 63%, 57%, 1)",
  accent8: "hsla(0, 63%, 59%, 1)",
  accent9: "hsla(0, 63%, 62%, 1)",
  accent10: "hsla(0, 63%, 65%, 1)",
  accent11: "hsla(250, 50%, 95%, 1)",
  accent12: "hsla(250, 50%, 95%, 1)",
};

const accentDark = {
  accent1: "hsla(0, 63%, 39%, 1)",
  accent2: "hsla(0, 63%, 41%, 1)",
  accent3: "hsla(0, 63%, 44%, 1)",
  accent4: "hsla(0, 63%, 46%, 1)",
  accent5: "hsla(0, 63%, 48%, 1)",
  accent6: "hsla(0, 63%, 51%, 1)",
  accent7: "hsla(0, 63%, 53%, 1)",
  accent8: "hsla(0, 63%, 55%, 1)",
  accent9: "hsla(0, 63%, 58%, 1)",
  accent10: "hsla(0, 63%, 60%, 1)",
  accent11: "hsla(250, 50%, 90%, 1)",
  accent12: "hsla(250, 50%, 95%, 1)",
};

const builtThemes = createV5Theme({
  darkPalette,
  lightPalette,
  componentThemes: v5ComponentThemes,
  accent: {
    light: accentLight,
    dark: accentDark,
  },
  childrenThemes: {
    // Include default color themes (blue, red, green, yellow, etc.)
    ...defaultChildrenThemes,

    // Semantic color themes for warnings, errors, and success states
    warning: {
      light: yellow,
      dark: yellowDark,
    },
    error: {
      light: red,
      dark: redDark,
    },
    success: {
      light: green,
      dark: greenDark,
    },
  },
});

export type Themes = typeof builtThemes;

// the process.env conditional here is optional but saves web client-side bundle
// size by leaving out themes JS. tamagui automatically hydrates themes from CSS
// back into JS for you, and the bundler plugins set TAMAGUI_ENVIRONMENT. so
// long as you are using the Vite, Next, Webpack plugins this should just work,
// but if not you can just export builtThemes directly as themes:
export const themes: Themes =
  process.env.TAMAGUI_ENVIRONMENT === "client" &&
  process.env.NODE_ENV === "production"
    ? ({} as any)
    : (builtThemes as any);
