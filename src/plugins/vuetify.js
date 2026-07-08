import "vuetify/styles";
import { createVuetify } from "vuetify";

const ORANGE = "#FE7F2D";
const ORANGE_DARK = "#E56A18";

export default createVuetify({
  icons: {
    defaultSet: "mdi",
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: ORANGE,
          "on-primary": "#FFFFFF",
          "primary-darken-1": ORANGE_DARK,

          secondary: "#233D4D",
          "secondary-darken-1": "#1B313E",
          "on-secondary": "#FFFFFF",

          success: "#22C55E",
          "success-darken-1": "#16A34A",
          "on-success": "#FFFFFF",

          info: "#3B82F6",
          "info-darken-1": "#2563EB",
          "on-info": "#FFFFFF",

          warning: ORANGE,
          "warning-darken-1": ORANGE_DARK,
          "on-warning": "#FFFFFF",

          error: "#EF4444",
          "error-darken-1": "#DC2626",
          "on-error": "#FFFFFF",

          background: "#EAECF0",
          "on-background": "#000000",

          surface: "#FFFFFF",
          "on-surface": "#000000",

          "grey-50": "#F9FAFB",
          "grey-100": "#F3F4F6",
          "grey-200": "#E5E7EB",
          "grey-300": "#D1D5DB",
          "grey-400": "#9CA3AF",
          "grey-500": "#6B7280",
          "grey-600": "#4B5563",
          "grey-700": "#374151",
          "grey-800": "#1F2937",
          "grey-900": "#111827",

          "perfect-scrollbar-thumb": "#D1D5DB",
          "skin-bordered-background": "#FFFFFF",
          "skin-bordered-surface": "#FFFFFF",

          "expansion-panel-text-custom-bg": "#F8F9FA",
          "track-bg": "#F3F4F6",
          "chat-bg": "#FFFFFF",
        },
        variables: {
          "code-color": ORANGE,
          "overlay-scrim-background": "#000000",
          "tooltip-background": "#233D4D",

          "overlay-scrim-opacity": 0.5,
          "hover-opacity": 0.04,
          "focus-opacity": 0.1,
          "selected-opacity": 0.08,
          "activated-opacity": 0.16,
          "pressed-opacity": 0.14,
          "dragged-opacity": 0.1,
          "disabled-opacity": 0.4,

          "border-color": "#233D4D",
          "border-opacity": 0.12,

          "table-header-color": "#F8F9FA",

          "high-emphasis-opacity": 0.9,
          "medium-emphasis-opacity": 0.7,

          "shadow-key-umbra-color": "#000000",
          "shadow-xs-opacity": "0.16",
          "shadow-sm-opacity": "0.18",
          "shadow-md-opacity": "0.20",
          "shadow-lg-opacity": "0.22",
          "shadow-xl-opacity": "0.24",
        },
      },

      dark: {
        dark: true,
        colors: {
          primary: ORANGE,
          "on-primary": "#FFFFFF",
          "primary-darken-1": ORANGE_DARK,

          secondary: "#EAECF0",
          "secondary-darken-1": "#D1D5DB",
          "on-secondary": "#000000",

          success: "#22C55E",
          "success-darken-1": "#16A34A",
          "on-success": "#FFFFFF",

          info: "#3B82F6",
          "info-darken-1": "#2563EB",
          "on-info": "#FFFFFF",

          warning: ORANGE,
          "warning-darken-1": ORANGE_DARK,
          "on-warning": "#FFFFFF",

          error: "#EF4444",
          "error-darken-1": "#DC2626",
          "on-error": "#FFFFFF",

          background: "#000000",
          "on-background": "#EAECF0",

          surface: "#111111",
          "on-surface": "#EAECF0",

          "grey-50": "#1A1A1A",
          "grey-100": "#222222",
          "grey-200": "#333333",
          "grey-300": "#444444",
          "grey-400": "#666666",
          "grey-500": "#888888",
          "grey-600": "#AAAAAA",
          "grey-700": "#CCCCCC",
          "grey-800": "#DDDDDD",
          "grey-900": "#F5F5F5",

          "perfect-scrollbar-thumb": "#444444",
          "skin-bordered-background": "#111111",
          "skin-bordered-surface": "#111111",

          "expansion-panel-text-custom-bg": "#1A1A1A",
          "track-bg": "#222222",
          "chat-bg": "#111111",
        },
        variables: {
          "code-color": ORANGE,
          "overlay-scrim-background": "#000000",
          "tooltip-background": "#EAECF0",

          "overlay-scrim-opacity": 0.5,
          "hover-opacity": 0.04,
          "focus-opacity": 0.1,
          "selected-opacity": 0.08,
          "activated-opacity": 0.16,
          "pressed-opacity": 0.14,
          "disabled-opacity": 0.4,

          "dragged-opacity": 0.1,

          "border-color": "#EAECF0",
          "border-opacity": 0.12,

          "table-header-color": "#1A1A1A",

          "high-emphasis-opacity": 0.9,
          "medium-emphasis-opacity": 0.7,

          "shadow-key-umbra-color": "#000000",
          "shadow-xs-opacity": "0.20",
          "shadow-sm-opacity": "0.22",
          "shadow-md-opacity": "0.24",
          "shadow-lg-opacity": "0.26",
          "shadow-xl-opacity": "0.28",
        },
      },
    },
  },
});
