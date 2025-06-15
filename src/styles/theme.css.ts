import { createTheme } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  colors: {
    primary: "#0070f3",
    primaryHover: "#0051a2",
    background: "#ffffff",
    foreground: "#171717",
    muted: "#f8f9fa",
    mutedForeground: "#6c757d",
    border: "#e9ecef",
    accent: "#0d6efd",
    accentForeground: "#ffffff",
    // Form-specific colors
    error: "#dc3545",
    errorForeground: "#ffffff",
    success: "#198754",
    successForeground: "#ffffff",
    warning: "#ffc107",
    warningForeground: "#000000",
    info: "#0dcaf0",
    infoForeground: "#000000",
    // Input states
    inputBackground: "#ffffff",
    inputBorder: "#ced4da",
    inputBorderFocus: "#86b7fe",
    inputBorderError: "#dc3545",
    inputBorderSuccess: "#198754",
    inputPlaceholder: "#6c757d",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
    xlarge: "4rem",
  },
  typography: {
    fontSize: {
      small: "0.875rem",
      base: "1rem",
      large: "1.125rem",
      xlarge: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
  radii: {
    small: "4px",
    medium: "8px",
    large: "12px",
    full: "9999px",
  },
});

export const darkThemeClass = createTheme(vars, {
  colors: {
    primary: "#0070f3",
    primaryHover: "#0051a2",
    background: "#0a0a0a",
    foreground: "#ededed",
    muted: "#1a1a1a",
    mutedForeground: "#a1a1aa",
    border: "#27272a",
    accent: "#0d6efd",
    accentForeground: "#ffffff",
    // Form-specific colors for dark theme
    error: "#dc3545",
    errorForeground: "#ffffff",
    success: "#198754",
    successForeground: "#ffffff",
    warning: "#ffc107",
    warningForeground: "#000000",
    info: "#0dcaf0",
    infoForeground: "#000000",
    // Input states for dark theme
    inputBackground: "#1a1a1a",
    inputBorder: "#404040",
    inputBorderFocus: "#86b7fe",
    inputBorderError: "#dc3545",
    inputBorderSuccess: "#198754",
    inputPlaceholder: "#a1a1aa",
  },
  spacing: vars.spacing,
  typography: vars.typography,
  radii: vars.radii,
});
