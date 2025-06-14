import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

// CSS Reset and base styles
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
});

globalStyle("html, body", {
  height: "100%",
});

globalStyle("body", {
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.colors.foreground,
  backgroundColor: vars.colors.background,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  textRendering: "optimizeLegibility",
});

globalStyle("#root, #__next", {
  isolation: "isolate",
});

// Typography styles
globalStyle("h1, h2, h3, h4, h5, h6", {
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.foreground,
  marginBottom: vars.spacing.medium,
});

globalStyle("h1", {
  fontSize: vars.typography.fontSize["3xl"],
  fontWeight: vars.typography.fontWeight.bold,
});

globalStyle("h2", {
  fontSize: vars.typography.fontSize["2xl"],
});

globalStyle("h3", {
  fontSize: vars.typography.fontSize.xlarge,
});

globalStyle("h4", {
  fontSize: vars.typography.fontSize.large,
});

globalStyle("h5", {
  fontSize: vars.typography.fontSize.base,
});

globalStyle("h6", {
  fontSize: vars.typography.fontSize.small,
});

globalStyle("p", {
  marginBottom: vars.spacing.medium,
  lineHeight: "1.6",
});

globalStyle("a", {
  color: vars.colors.primary,
  textDecoration: "none",
  transition: "color 0.2s ease",
});

globalStyle("a:hover", {
  color: vars.colors.primaryHover,
  textDecoration: "underline",
});

globalStyle("a:focus", {
  outline: `2px solid ${vars.colors.primary}`,
  outlineOffset: "2px",
  borderRadius: vars.radii.small,
});

// List styles
globalStyle("ul, ol", {
  paddingLeft: vars.spacing.large,
  marginBottom: vars.spacing.medium,
});

globalStyle("li", {
  marginBottom: vars.spacing.small,
});

// Code styles
globalStyle("code", {
  fontSize: vars.typography.fontSize.small,
  backgroundColor: vars.colors.muted,
  padding: `${vars.spacing.small} ${vars.spacing.medium}`,
  borderRadius: vars.radii.small,
  border: `1px solid ${vars.colors.border}`,
});

globalStyle("pre", {
  fontSize: vars.typography.fontSize.small,
  backgroundColor: vars.colors.muted,
  padding: vars.spacing.medium,
  borderRadius: vars.radii.medium,
  border: `1px solid ${vars.colors.border}`,
  overflow: "auto",
  marginBottom: vars.spacing.medium,
});

globalStyle("pre code", {
  backgroundColor: "transparent",
  padding: 0,
  border: "none",
});

// Form element styles
globalStyle("input, textarea, select", {
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
});

globalStyle("button", {
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  cursor: "pointer",
});

globalStyle("button:disabled", {
  cursor: "not-allowed",
});

// Image styles
globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("img, video", {
  height: "auto",
});

// Table styles
globalStyle("table", {
  borderCollapse: "collapse",
  borderSpacing: 0,
  width: "100%",
  marginBottom: vars.spacing.medium,
});

globalStyle("th, td", {
  padding: vars.spacing.medium,
  textAlign: "left",
  borderBottom: `1px solid ${vars.colors.border}`,
});

globalStyle("th", {
  fontWeight: vars.typography.fontWeight.semibold,
  backgroundColor: vars.colors.muted,
});

// Focus styles for accessibility
globalStyle("*:focus", {
  outline: `2px solid ${vars.colors.primary}`,
  outlineOffset: "2px",
});

// Remove focus outline for mouse users
globalStyle("*:focus:not(:focus-visible)", {
  outline: "none",
});

// Selection styles
globalStyle("::selection", {
  backgroundColor: vars.colors.primary,
  color: vars.colors.background,
});

// Scrollbar styles (webkit)
globalStyle("::-webkit-scrollbar", {
  width: "8px",
  height: "8px",
});

globalStyle("::-webkit-scrollbar-track", {
  backgroundColor: vars.colors.muted,
});

globalStyle("::-webkit-scrollbar-thumb", {
  backgroundColor: vars.colors.border,
  borderRadius: vars.radii.full,
});

globalStyle("::-webkit-scrollbar-thumb:hover", {
  backgroundColor: vars.colors.mutedForeground,
});

// Reduced motion support
globalStyle("*", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationDuration: "0.01ms",
      animationIterationCount: "1",
      transitionDuration: "0.01ms",
      scrollBehavior: "auto",
    },
  },
});
