import { globalStyle } from "@vanilla-extract/css";
import { vars, tokens } from "./theme.css";

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
  fontFamily: vars.typography.fontFamily.sans,
  fontSize: tokens.typography.fontSize.base,
  fontWeight: tokens.typography.fontWeight.normal,
  lineHeight: tokens.typography.lineHeight.normal,
  color: vars.color.text.primary,
  backgroundColor: vars.color.background.primary,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  // Improved text rendering
  textRendering: "optimizeLegibility",
});

globalStyle("#root, #__next", {
  isolation: "isolate",
});

// Typography styles
globalStyle("h1, h2, h3, h4, h5, h6", {
  fontWeight: tokens.typography.fontWeight.semibold,
  lineHeight: tokens.typography.lineHeight.tight,
  color: vars.color.text.primary,
  marginBottom: vars.spacing[4],
});

globalStyle("h1", {
  fontSize: tokens.typography.fontSize["4xl"],
  fontWeight: tokens.typography.fontWeight.bold,
});

globalStyle("h2", {
  fontSize: tokens.typography.fontSize["3xl"],
});

globalStyle("h3", {
  fontSize: tokens.typography.fontSize["2xl"],
});

globalStyle("h4", {
  fontSize: tokens.typography.fontSize.xl,
});

globalStyle("h5", {
  fontSize: tokens.typography.fontSize.lg,
});

globalStyle("h6", {
  fontSize: tokens.typography.fontSize.base,
});

globalStyle("p", {
  marginBottom: vars.spacing[4],
  lineHeight: tokens.typography.lineHeight.relaxed,
});

globalStyle("a", {
  color: vars.color.brand.primary,
  textDecoration: "none",
  transition: `color ${tokens.animation.duration.fast} ${tokens.animation.easing.easeInOut}`,
});

globalStyle("a:hover", {
  color: vars.color.brand.primaryHover,
  textDecoration: "underline",
});

globalStyle("a:focus", {
  outline: `2px solid ${vars.color.border.focus}`,
  outlineOffset: "2px",
  borderRadius: vars.borderRadius.sm,
});

// List styles
globalStyle("ul, ol", {
  paddingLeft: vars.spacing[6],
  marginBottom: vars.spacing[4],
});

globalStyle("li", {
  marginBottom: vars.spacing[2],
});

// Code styles
globalStyle("code", {
  fontFamily: vars.typography.fontFamily.mono,
  fontSize: tokens.typography.fontSize.sm,
  backgroundColor: vars.color.background.secondary,
  padding: `${vars.spacing[1]} ${vars.spacing[2]}`,
  borderRadius: vars.borderRadius.base,
  border: `1px solid ${vars.color.border.primary}`,
});

globalStyle("pre", {
  fontFamily: vars.typography.fontFamily.mono,
  fontSize: tokens.typography.fontSize.sm,
  backgroundColor: vars.color.background.secondary,
  padding: vars.spacing[4],
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.color.border.primary}`,
  overflow: "auto",
  marginBottom: vars.spacing[4],
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
  marginBottom: vars.spacing[4],
});

globalStyle("th, td", {
  padding: vars.spacing[3],
  textAlign: "left",
  borderBottom: `1px solid ${vars.color.border.primary}`,
});

globalStyle("th", {
  fontWeight: tokens.typography.fontWeight.semibold,
  backgroundColor: vars.color.background.secondary,
});

// Blockquote styles
globalStyle("blockquote", {
  borderLeft: `4px solid ${vars.color.brand.primary}`,
  paddingLeft: vars.spacing[4],
  marginLeft: 0,
  marginBottom: vars.spacing[4],
  fontStyle: "italic",
  color: vars.color.text.secondary,
});

// HR styles
globalStyle("hr", {
  border: "none",
  height: "1px",
  backgroundColor: vars.color.border.primary,
  margin: `${vars.spacing[8]} 0`,
});

// Focus styles for accessibility
globalStyle("*:focus", {
  outline: `2px solid ${vars.color.border.focus}`,
  outlineOffset: "2px",
});

// Remove focus outline for mouse users
globalStyle("*:focus:not(:focus-visible)", {
  outline: "none",
});

// Selection styles
globalStyle("::selection", {
  backgroundColor: vars.color.brand.primary,
  color: vars.color.text.inverse,
});

// Scrollbar styles (webkit)
globalStyle("::-webkit-scrollbar", {
  width: "8px",
  height: "8px",
});

globalStyle("::-webkit-scrollbar-track", {
  backgroundColor: vars.color.background.secondary,
});

globalStyle("::-webkit-scrollbar-thumb", {
  backgroundColor: vars.color.border.secondary,
  borderRadius: vars.borderRadius.full,
});

globalStyle("::-webkit-scrollbar-thumb:hover", {
  backgroundColor: vars.color.text.tertiary,
});

// Print styles
globalStyle("@media print", {
  "*": {
    backgroundColor: "white !important",
    color: "black !important",
    boxShadow: "none !important",
    textShadow: "none !important",
  },
  "a, a:visited": {
    textDecoration: "underline",
  },
  "a[href]:after": {
    content: " (" + "attr(href)" + ")",
  },
  "abbr[title]:after": {
    content: " (" + "attr(title)" + ")",
  },
  "pre, blockquote": {
    border: "1px solid #999",
    pageBreakInside: "avoid",
  },
  thead: {
    display: "table-header-group",
  },
  "tr, img": {
    pageBreakInside: "avoid",
  },
  img: {
    maxWidth: "100% !important",
  },
  "p, h2, h3": {
    orphans: 3,
    widows: 3,
  },
  "h2, h3": {
    pageBreakAfter: "avoid",
  },
});

// Reduced motion support
globalStyle("@media (prefers-reduced-motion: reduce)", {
  "*": {
    animationDuration: "0.01ms !important",
    animationIterationCount: "1 !important",
    transitionDuration: "0.01ms !important",
    scrollBehavior: "auto !important",
  },
});
